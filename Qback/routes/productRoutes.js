const express = require("express");
const router = express.Router();

const {
  createProduct,
  productById,
  readProduct,
  updateProduct,
  removeProduct,
  listProducts,
  relatedProducts,
  productCategories,
  productDepartments,
  productTags,
  listBySearch,
  productPhoto,
  listSearchedProducts,
} = require("../controllers/productController");
const { userById } = require("../controllers/userController");
const {
  requireSignin,
  isAuth,
  isAdmin,
  isVendor,
} = require("../controllers/authController");

// Create product
router.post(
  "/product/create/:userId",
  requireSignin,
  isAuth,
  isVendor,
  createProduct
);

// View product
router.get("/product/:productId", readProduct);

// List products
router.get("/products", listProducts);

// Edit product
router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isVendor,
  updateProduct
);

// Delete product
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isVendor,
  removeProduct
);

// Get related products
router.get("/product/related/:productId", relatedProducts);

// Get product categories
router.get("/products/categories", productCategories);

// Get product departments
router.get("/products/departments", productDepartments);

// Get product tags
router.get("/products/tags", productTags);

// Listing products queried from search bar
router.get("/products/search", listSearchedProducts);

// Listing products by search
router.post("/products/by/search", listBySearch);

// Gettin product photos
router.get("/product/photo/:productId", productPhoto);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
