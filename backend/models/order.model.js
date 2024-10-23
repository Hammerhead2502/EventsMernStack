const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userModel = require("../models/user.model");
const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: userModel,
    required: true,
  },
  products: {
    type: Array,
    default: [],
  },
  orderID: {
    type: String,
    required: true,
  },
  paymentID: {
    type: String,
    required: true,
  },
  signature: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("order", orderSchema);
