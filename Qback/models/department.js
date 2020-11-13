const slugify = require("slugify");
const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: [50, "A department name should not exceed 50 characters"],
      unique: true,
    },
    slug: String,
  },
  { timestamps: true }
);

//Document Middleware
departmentSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model("Department", departmentSchema);
