const slugify = require("slugify");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: [50, "A category name must be at most 50 characters"],
      unique: true,
    },
    slug: String,
  },
  { timestamps: true }
);

//Document Middleware
categorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model("Category", categorySchema);
