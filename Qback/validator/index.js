exports.userSignupValidator = (req, res, next) => {
  req.check("name", "Enter your name").notEmpty();
  req.check("username", "Create a username").notEmpty();
  req.check("email", "Enter your email").notEmpty();
  req
    .check("username")
    .isLength({ min: 3, max: 32 })
    .withMessage("Username must contain between 3 and 32 characters")
    .matches(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/)
    .withMessage(
      "Username can only contain alphanumeric charaters, and can include but not begin nor end with uderscores, and dots"
    );
  req
    .check("email")
    .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    .withMessage("Email must contain '@' symbol and .domain")
    .isLength({
      min: 7,
      max: 50,
    });
  req.check("password", "Create a password").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
    .withMessage(
      "Password must contain at least one number, one uppercase and one lowercase letter"
    );

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ status: "Failed", error: firstError });
  }

  next();
};

exports.userSignInValidator = (req, res, next) => {
  req.check("email", "Enter your email").notEmpty();
  req.check("password", "Enter your password").notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ status: "Failed", error: firstError });
  }

  next();
};
