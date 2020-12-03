const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: [50, "Product name should not exceed 50 characters"],
    },
    slug: String,
    description: {
      type: String,
      required: true,
      maxlength: [2000, "Description should not exceed 2000 charaters"],
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    priceDiscount: {
      type: Number,
      // Only works with creating new products, not when updating documents
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message:
          "Discount price ({VALUE}) should be less than the regular price",
      },
    },
    category: [
      {
        type: ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    imageCover: {
      type: String,
    },
    images: [String],
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    seller: {
      type: ObjectId,
      ref: "User",
    },
    ratingAverage: {
      type: Number,
      default: 4,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10, // This will return a rounded decimal
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    size: {
      type: [String],
      default: "Not Applicable",
      enum: [
        "Small",
        "Medium",
        "Large",
        "Extra-Large",
        "XXL",
        "Not Applicable",
      ],
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    department: {
      type: ObjectId,
      required: true,
      ref: "Department",
    },

    tag: [
      {
        type: ObjectId,
        ref: "Tag",
      },
    ],
    sku: {
      type: String,
      trim: true,
    },
    condition: {
      type: Boolean,
      required: true,
    },
    shipping: {
      type: String,
      required: true,
    },
    address: {
      type: ObjectId,
      ref: "Location",
    },
    location: [],
    shippingTime: {
      type: Number,
      trim: true,
    },
    approved: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  { timestamps: true }
);

productSchema.index({ price: 1, ratingAverage: -1 });
productSchema.index({ slug: 1 });

// Virtual fields
// productSchema.virtual("reviews", {
//   ref: "Review",
//   foreignField: "product",
//   localField: "_id",
// });

//Document Middleware
productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

productSchema.index({ location: "2dsphere" });

// Pre save middleware for embedding documents
// productSchema.pre("save", async function (next) {
//   const categoriesPromises = this.category.map(
//     async (id) => await Category.findById(id)
//   );
//   this.category = await Promise.all(categoriesPromises);
//   next();
// });

module.exports = mongoose.model("Product", productSchema);
