const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Product = require("./product");

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    review: {
      type: String,
      required: [true, "A review cannot be empty."],
    },
    product: {
      type: ObjectId,
      ref: "Product",
      required: [true, "A review must belong to a product."],
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

// Query middleware
// reviewSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "product",
//     select: "name",
//   }).populate({
//     path: "user",
//     select: "name photo",
//   });

//   next();
// });

// Getting Average ratings and rating quantity for a product on each review

reviewSchema.statics.calcAverageRating = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: "product",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  //   console.log(stats);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingQuantity: stats[0].nRating,
      ratingAverage: stats[0].avgRating,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingQuantity: 0,
      ratingAverage: 4,
    });
  }
};

reviewSchema.post("save", function () {
  this.constructor.calcAverageRating(this.product);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.re = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function (next) {
  await this.re.constructor.calcAverageRating(this.re.product);
});

module.exports = mongoose.model("Review", reviewSchema);
