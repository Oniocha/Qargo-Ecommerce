const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    country: {
      name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50,
      },
    },
    region: {
      name: {
        type: String,
        trim: true,
        maxlength: 50,
      },
    },
    city: {
      name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Location", locationSchema);
