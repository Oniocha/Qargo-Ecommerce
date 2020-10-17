const User = require("../models/user");
const jwt = require("jsonwebtoken"); // => to generage signed token
const expressJwt = require("express-jwt"); // => to authorization check
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = (req, res) => {
  //Check if usernamme is taken
  const { username } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err || user) {
      return res.status(400).json({
        error: "Username already taken. Try another one",
      });
    } else {
      const user = new User(req.body);
      user.save((err, user) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
          user,
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  // find the user by email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      res.status(400).json({
        error: "User with that email does not exist. Please sign up",
      });
    }
    // if the user is found check that email and password match
    // create the authentication method in user model
    if (user !== null && !user.authenticate(password)) {
      return res.status(401).json({
        error: "Incorrect password, please try again",
      });
    }

    if (user !== null) {
      // generate a signed token with user id and secret
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      //persist token as 't' in cookie with expiry date
      res.cookie("t", token, { expire: new Date() + 9999 });
      // return response with user and token to frontend

      const { _id, name, email, username, role } = user;
      return res.json({ token, user: { _id, name, email, username, role } });
    }
  });
};

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
      error: "Access denied! Sign in required",
    });
  }
  next();
};

exports.isVendor = (req, res, next) => {
  if (req.profile.role !== 1) {
    return res.status(403).json({
      error:
        "Vendor resource! Please turn on 'Start Selling' in your user account",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role !== 4286) {
    return res.status(403).json({
      error: "Admin resource! Access denied",
    });
  }
  next();
};
