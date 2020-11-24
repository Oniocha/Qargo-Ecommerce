const express = require("express");
const router = express.Router();

const {
  getReviews,
  postReviews,
  deleteReview,
  updateReview,
  reviewById,
  getAllReviews,
} = require("../controllers/reviewController");
const { userById } = require("../controllers/userController");
const { protect, isAdmin } = require("../controllers/authController");
const { productById } = require("../controllers/productController");

// Admin view all reviews
router.get("/all/:userId", protect, isAdmin, getAllReviews);

// Get reviews
router.get("/:productId", getReviews);

// Write, delete, update reviews
router.post("/:productId/:userId", protect, postReviews);
router
  .route("/:reviewId/:productId/:userId")
  .patch(protect, updateReview)
  .delete(protect, deleteReview);

router.param("userId", userById);
router.param("productId", productById);
router.param("reviewId", reviewById);

module.exports = router;
