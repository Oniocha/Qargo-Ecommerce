const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },

    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    seller: {
      type: String,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "",
      enum: ["Small", "Medium", "Large", "Extra-Large", "XXL"],
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

module.exports = mongoose.model("Product", productSchema);
