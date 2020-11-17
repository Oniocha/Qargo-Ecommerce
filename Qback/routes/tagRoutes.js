const express = require("express");
const router = express.Router();

const {
  createTag,
  tagById,
  readTag,
  removeTag,
  updateTag,
  listTags,
} = require("../controllers/tagController");
const { userById } = require("../controllers/userController");
const {
  protect,
  isAuth,
  isAdmin,
  isVendor,
} = require("../controllers/authController");

//Create tag
router.post("/tag/create/:userId", protect, isAuth, isVendor, createTag);

// View tag
router.get("/tag/:tagId", readTag);

//Update tag
router.put("/tag/:tagId/:userId", protect, isAuth, isVendor, updateTag);

//delete tag
router.delete("/tag/:tagId/:userId", protect, isAuth, isVendor, removeTag);

//list tags
router.get("/tags", listTags);

router.param("userId", userById);
router.param("tagId", tagById);

module.exports = router;
