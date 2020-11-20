const express = require("express");
const router = express.Router();

const {
  userById,
  readUser,
  updateMe,
  updateUser,
  getAllUsers,
  deleteMe,
} = require("../controllers/userController");
const { isAdmin, protect } = require("../controllers/authController");

/**
 * Use this route for account for vendors and another for admins
 * router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});
 */

router
  .route("/user/:userId")
  .get(protect, readUser)
  .patch(protect, updateMe)
  .delete(protect, deleteMe);

//Get All users
router.get("/users/:userId", protect, isAdmin, getAllUsers);

router.param("userId", userById);

module.exports = router;
