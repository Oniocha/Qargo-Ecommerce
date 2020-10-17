const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  signout,
  requireSignin,
} = require("../controllers/authController");
const { userSignupValidator, userSignInValidator } = require("../validator");

router.post("/signup", userSignupValidator, signup);
router.post("/signin", userSignInValidator, signin);
router.get("/signout", signout);

module.exports = router;
