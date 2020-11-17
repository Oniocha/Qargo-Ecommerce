const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50,
    },
    username: {
      type: String,
      trim: true,
      required: true,
      maxlength: 20,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50,
      unique: true,
      lowercase: true,
    },
    photo: String,
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 8,
    },
    about: {
      type: String,
      trim: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
    digitalLibrary: {
      type: Array,
      default: [],
    },
    cart: {
      type: Array,
      default: [],
    },
    wishList: {
      type: Array,
      default: [],
    },
    products: {
      type: Array,
      default: [],
    },
    mobile: {
      type: Number,
      trim: true,
      maxlength: 15,
      validate: [validator.isMobilePhone, "Phone number must be valid"],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

// Document middlewares
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;

  next();
});

// Define userSchema methods
userSchema.methods = {
  authenticate: async function (plaintextPassword, userPassword) {
    let correct = await bcrypt.compare(plaintextPassword, userPassword);
    // console.log(correct);
    return correct;
  },

  passwordChanged: function (JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedPasswordTimeStamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
      return JWTTimestamp < changedPasswordTimeStamp;
    }

    // False means the password has not been changed for current log in token
    return false;
  },

  createPasswordResetToken: function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // console.log({ resetToken }, this.passwordResetToken);

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
  },

  tallyToken: function (token) {
    let encryptedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    console.log(encryptedToken === this.passwordResetToken);
  },
};

module.exports = mongoose.model("User", userSchema);
