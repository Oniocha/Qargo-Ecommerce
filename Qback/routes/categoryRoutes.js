const express = require("express");
const router = express.Router();

const {
  createCategory,
  categoryById,
  readCategory,
  removeCategory,
  updateCategory,
  listCategories,
} = require("../controllers/categoryController");
const { userById } = require("../controllers/userController");
const {
  protect,
  isAuth,
  isAdmin,
  isVendor,
} = require("../controllers/authController");

//create category
router.post(
  "/category/create/:userId",
  protect,
  isAuth,
  isVendor,
  createCategory
);

//view category
router.get("/category/:categoryId", readCategory);

//edit category
router.put(
  "/category/:categoryId/:userId",
  protect,
  isAuth,
  isAdmin,
  updateCategory
);

//delete category
router.delete(
  "/category/:categoryId/:userId",
  protect,
  isAuth,
  isAdmin,
  removeCategory
);

//list categories
router.get("/categories", listCategories);

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
