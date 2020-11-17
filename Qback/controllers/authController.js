const User = require("../models/user");
const { promisify } = require("util");
const jwt = require("jsonwebtoken"); // => to generage signed token
const crypto = require("crypto");
const expressJwt = require("express-jwt"); // => to authorization check
const sendEmail = require("../utils/email");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appErrors");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  // res.cookie("t", token, { expire: new Date() + 9999 });
};

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const { _id, name, email, username, role } = user;
  res.status(statusCode).json({
    status: "success",
    token,
    user: { _id, name, email, username, role },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    // req.body
  });
  // generate a signed token with user id and secret
  createAndSendToken(user, 201, res);
});

exports.signin = catchAsync(async (req, res, next) => {
  const { password } = req.body;

  // find the user by email
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );
  if (!user || !(await user.authenticate(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // generate a signed token with user id and secret
  createAndSendToken(user, 200, res);
});

exports.signout = (req, res) => {
  res.clearCookie("t");
  return res.json({ message: "Signed out successfully" });
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and checking if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token)
    return next(
      new AppError("You are not logged in. Please log in to get success", 401)
    );

  // 2) Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    return next(
      new AppError("This user no longer exists! Please sign up.", 401)
    );

  // 4) Check is user changed password after token was issued
  if (currentUser.passwordChanged(decoded.iat))
    return next(
      new AppError(
        "This user recently changed their password. Please log in.",
        401
      )
    );

  // 5) Check User Authorization
  if (req.params.userId !== decoded.id)
    return next(
      new AppError("Access denied! You are not authorized for this user", 401)
    );

  // Granting access to the protected route
  req.auth = currentUser;
  next();
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth.id;
  console.log(user);
  if (!user) {
    return res.status(403).json({
      status: "Failed",
      error: "Access denied! jSign in required",
    });
  }

  next();
};

exports.isVendor = (req, res, next) => {
  if (req.auth.role !== 2424) {
    return next(
      new AppError(
        "Vendor resource! Please turn on 'Start Selling' to become a vendor",
        403
      )
    );
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.auth.role !== 4286) {
    return next(new AppError("Admin resource! Access denied", 403));
  }
  next();
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // Before we start, check to make sure user has entered their email address
  if (!req.body.email)
    return next(new AppError("Please enter your email address."), 401);

  // 1) Getting user based on email provided
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(
      new AppError("No user found with that email address. Please sign up."),
      404
    );

  // 2) Generating a reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Sending token to user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Follow the link below to reset your password, the link is valid for 10 minutes.\n\n${resetURL}\n\nIf you did not forget your password, please ignore this email!\nThis email was sent to ${user.email}.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your Password Reset Token (Valid for 10 minutes)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Password reset token sent to email!",
    });
  } catch (err) {
    user.createPasswordResetToken = undefined;
    user.passwordResetExpiresIn = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  let encryptedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  let user = await User.findOne({
    passwordResetToken: encryptedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) return next(new AppError("Token is invalid or has expired.", 400));

  // 2) If token has not expired, and there is a user, set the new password

  if (!req.body.password)
    return next(new AppError("Please enter your new password", 401));

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Updated passwordChangedAt property for the user in user pre save middleware

  // 4) Log the user in, and send JWT
  createAndSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  // 1) Getting user from collection
  const user = await User.findById(req.auth._id).select("+password");
  if (!user) return next(new AppError("User was not found. Please log in."));

  // 2) Checking if posted password is correct
  if (!(await user.authenticate(oldPassword, user.password)))
    return next(new AppError("The old password you entered is incorrect"));

  // 3) Updating password
  user.password = newPassword;
  await user.save();

  // 4) Logging user in, JWT
  createAndSendToken(user, 200, res);
});
