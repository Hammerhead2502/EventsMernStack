const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventsSchema = new Schema({
  event_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  gallery: {
    type: Array,
    default: [],
  },
  address: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  target_audience: {
    type: String,
    default: "3+",
  },
  terms: {
    type: String,
    default: "",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: Number,
    default: 0,
  },
  diamond_seats: {
    type: Number,
    default: 20,
  },
  platinum_seats: {
    type: Number,
    default: 20,
  },
  gold_seats: {
    type: Number,
    default: 30,
  },
  silver_seats: {
    type: Number,
    default: 50,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  diamond_price: {
    type: Number,
    default: 1000,
  },
  platinum_price: {
    type: Number,
    default: 800,
  },
  gold_price: {
    type: Number,
    default: 500,
  },
  silver_price: {
    type: Number,
    default: 200,
  },
});

module.exports = mongoose.model("mern_events", eventsSchema);
