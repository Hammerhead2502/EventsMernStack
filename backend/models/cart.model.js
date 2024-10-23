const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const eventModel = require("./events.model");
const userModel = require("./user.model");
const cartSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: eventModel,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: userModel,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  seating: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("cart", cartSchema);
