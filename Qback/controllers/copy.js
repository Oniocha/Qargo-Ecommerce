const User = require("../models/user");
const jwt = require("jsonwebtoken"); // => to generage signed token
const expressJwt = require("express-jwt"); // => to authorization check
const { errorHandler } = require("../helpers/dbErrorHandler");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appErrors");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  // res.cookie("t", token, { expire: new Date() + 9999 });
};

exports.signup = catchAsync(async (req, res, next) => {
  //Check if usernamme is taken
  const { username } = req.body;
  await User.findOne({ email: req.body.email }, (err, usr) => {
    if (err || usr) {
      return res.status(400).json({
        status: "Failed",
        error: "Email already exists. Please sign in",
      });
    }
  });
  await User.findOne({ username }, async (err, usr) => {
    if (err || usr) {
      return res.status(400).json({
        status: "Failed",
        error: "Username already taken. please try another one",
      });
    } else {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
      });
      // generate a signed token with user id and secret
      const token = signToken(user._id);
      user.hashed_password = undefined;
      const { _id, name, email, username } = user;
      res.status(201).json({
        token,
        user: { _id, name, email, username },
      });
    }
  });
});

exports.signin = catchAsync(async (req, res, next) => {
  const { password } = req.body;

  // find the user by email
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );
  console.log(user);
  if (!user || !(await user.authenticate(password, user.password))) {
    console.log("stuck");
    res.status(401).json({
      status: "failed",
      error: "Incorrect email or password",
    });
  }

  console.log("Here");
  // generate a signed token with user id and secret
  const token = signToken(user._id);
  const { _id, name, email, username } = user;
  res.status(200).json({
    token,
    user: { _id, name, email, username },
  });
  console.log("sent response");
});

// exports.signin = async (req, res) => {
//   // find the user by email
//   const { email, password } = req.body;
//   await User.findOne({ email }, (err, user) => {
//     if (err || !user) {
//       res.status(400).json({
//         status: "Failed",
//         error: "User with that email does not exist. Please sign up",
//       });
//     }
//     // if the user is found check that email and password match
//     // create the authentication method in user model
//     if (user !== null && !user.authenticate(password)) {
//       return res.status(401).json({
//         status: "Failed",
//         error: "Incorrect password, please try again",
//       });
//     }

//     if (user !== null) {
//       // generate a signed token with user id and secret
//       const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRES_IN,
//       });
//       //persist token as 't' in cookie with expiry date
//       res.cookie("t", token, { expire: new Date() + 9999 });
//       // return response with user and token to frontend
//       const { _id, name, email, username, role } = user;
//       res.status(200).json({
//         status: 200,
//         token,
//         user: { _id, name, email, username, role },
//       });
//     }
//   });
// };

exports.signout = (req, res) => {
  res.clearCookie("t");
  return res.json({ message: "Signed out successfully" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      status: "Failed",
      error: "Access denied! Sign in required",
    });
  }
  next();
};

exports.isVendor = (req, res, next) => {
  if (req.profile.role !== 1) {
    return res.status(403).json({
      status: "Failed",
      error:
        "Vendor resource! Please turn on 'Start Selling' in your user account",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role !== 4286) {
    return res.status(403).json({
      status: "Failed",
      error: "Admin resource! Access denied",
    });
  }
  next();
};
