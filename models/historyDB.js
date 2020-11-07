var mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

var Schema = mongoose.Schema;

var historySchema = new Schema(
  {
    name: String,
    status: String,
    location: String,
    productName: String,
    time: String,
    price: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", historySchema);
