const express = require("express");
const router = express.Router();

const {
  userById,
  readUser,
  updateUser,
} = require("../controllers/userController");
const {
  requireSignin,
  isAuth,
  isAdmin,
} = require("../controllers/authController");

/**
 * Use this route for account for vendors and another for admins
 * router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});
 */

router.get("/user/:userId", requireSignin, isAuth, readUser);
router.put("/user/:userId", requireSignin, isAuth, updateUser);

router.param("userId", userById);

module.exports = router;
