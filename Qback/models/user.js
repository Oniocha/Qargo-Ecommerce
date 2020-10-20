const crypto = require("crypto");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

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
      maxlength: 32,
      unique: true,
      collation: { locale: "en", strength: 2 },
    },
    email: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50,
      index: {
        unique: true,
        collation: { locale: "en", strength: 2 },
      },
    },
    hashed_password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    salt: String,
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
    mobile: {
      type: Number,
      trim: true,
      maxlength: 15,
    },
  },
  { timestamps: true }
);

//Virtual fields
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

//Define userSchema methods
userSchema.methods = {
  authenticate: function (plaintext) {
    return this.encryptPassword(plaintext) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) {
      return "";
    }
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
