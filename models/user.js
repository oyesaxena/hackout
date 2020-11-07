var mongoose = require("mongoose");

const crypto = require("crypto");

const uuuidv1 = require("uuid/v1");

const { ObjectId } = mongoose.Schema;

var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: 32,
    },
    lastname: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: 32,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    images: [],
    rates: [],
    productNames: [],
    locations: [],
    selectedGuides: [
      { name: String, time: String, price: String, location: String },
    ],
    selectedSellerRates: [],
    selectedProductNames: [],
    history: [
      {
        name: String,
        status: String,
        location: String,
        productName: String,
        time: String,
        price: String,
      },
    ],
    touristHour: { type: String },
    touristRate: { type: String },
    touristLocation: { type: String },
    identity: [],
    imagesCount: { type: Number, default: 0 },
    selectedPlaces: [],
    selectedSellerImages: [],
    selectedImagesCountTourists: { type: Number, default: 0 },
    selectedImagesCountSellers: { type: Number, default: 0 },
    videos: [],
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) === this.encry_password;
  },

  securePassword: function (plainPassword) {
    if (!plainPassword) {
      return "";
    }
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
