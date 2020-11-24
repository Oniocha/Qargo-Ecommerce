const Review = require("../models/review");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appErrors");
const review = require("../models/review");

exports.reviewById = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.reviewId);
  if (!review) return next(new AppError("No review found", 404));

  req.review = review;
  next();
});

exports.getReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({
    product: req.params.productId,
  }).populate({
    path: "user",
    select: "name email username",
  });

  if (!reviews || reviews.length === 0)
    return next(new AppError("No reviews found for this product!", 404));

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: reviews,
  });
});

exports.postReviews = catchAsync(async (req, res, next) => {
  let review = await Review.create({
    rating: req.body.rating,
    review: req.body.review,
    product: req.product._id,
    user: req.profile._id,
  });

  res.status(200).json({
    status: "success",
    message: "Review succefully added!",
    data: { review },
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  await Review.findByIdAndDelete(req.review.id);

  res.status(202).json({
    status: "success",
    message: "Review deleted successfully.",
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const updatedReview = await Review.findByIdAndUpdate(
    { _id: req.review.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "Review succefully updated!",
    data: {
      review: updatedReview,
    },
  });
});

//Admin getAll Reviews
exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find().populate("product user");

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});
