const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  old_Passwords: {
    type: Array,
    default: [],
  },
  status: {
    type: Number,
    default: 1,
  },
  contact_no: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  acc_type: {
    type: String,
    default: "regular",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("user", userSchema);
