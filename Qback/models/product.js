const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const slugify = require("slugify");
const validator = require("validator");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: [50, "Product name should not exceed 50 characters"],
      validate: [
        validator.isAlphanumeric,
        "A product name can only contain alphanumeric characters",
      ],
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
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
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
      default: 0,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
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
    tag: {
      type: ObjectId,
      ref: "Tag",
    },
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
    country: {
      type: ObjectId,
      ref: "Country",
    },
    region: {
      type: ObjectId,
      ref: "Region",
    },
    city: {
      type: ObjectId,
      ref: "City",
    },
    shippingTime: {
      type: Number,
      trim: true,
    },
  },
  { timestamps: true }
);

//Document Middleware
productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model("Product", productSchema);
