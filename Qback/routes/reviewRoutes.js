const express = require("express");
const router = express.Router();

const {
  getReviews,
  postReviews,
  deleteReview,
  updateReview,
  reviewById,
} = require("../controllers/reviewController");
const { userById } = require("../controllers/userController");
const { protect } = require("../controllers/authController");
const { productById } = require("../controllers/productController");

// Get reviews
router.get("/review/:productId", getReviews);

// Write, delete, update reviews
router.post("/review/:productId/:userId", protect, postReviews);
router
  .route("/review/:reviewId/:productId/:userId")
  .patch(protect, updateReview)
  .delete(protect, deleteReview);

router.param("userId", userById);
router.param("productId", productById);
router.param("reviewId", reviewById);

module.exports = router;
