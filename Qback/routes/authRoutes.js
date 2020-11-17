const express = require("express");
const router = express.Router();

const { userById } = require("../controllers/userController");

const {
  signup,
  signin,
  signout,
  protect,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require("../controllers/authController");
const {
  userSignupValidator,
  userSignInValidator,
  userPasswordResetValidator,
} = require("../validator");

router.post("/signup", userSignupValidator, signup);
router.post("/signin", userSignInValidator, signin);
router.get("/signout", signout);

// forgot password
router.post("/users/forgotPassword", forgotPassword);

// rest password
router.patch(
  "/users/resetPassword/:token",
  userPasswordResetValidator,
  resetPassword
);

// update user
router.patch(
  "/users/updatePassword/:userId",
  userPasswordResetValidator,
  protect,
  updatePassword
);

router.param("userId", userById);
module.exports = router;
