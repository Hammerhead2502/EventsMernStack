const eventModel = require("../models/events.model");

const addEvent = async (req, res) => {
  try {
    const {
      event_name,
      description,
      gallery,
      address,
      venue,
      city,
      date,
      time,
      artist,
      category,
      language,
      target_audience,
      terms,
      thumbnail,
      diamond_price,
      platinum_price,
      gold_price,
      silver_price,
      diamond_seats,
      platinum_seats,
      gold_seats,
      silver_seats,
    } = req.body;
    const exisEvent = await eventModel.findOne({ event_name: event_name });
    if (exisEvent) {
      return res.status(403).json({
        success: false,
        message: "Event already exists",
      });
    } else {
      const newEvent = await eventModel.create({
        event_name: event_name,
        description: description,
        gallery: gallery,
        address: address,
        venue: venue,
        city: city,
        date: date,
        time: time,
        artist: artist,
        category: category,
        language: language,
        target_audience: target_audience,
        terms: terms,
        thumbnail: thumbnail,
        diamond_price: diamond_price,
        platinum_price: platinum_price,
        gold_price: gold_price,
        silver_price: silver_price,
        diamond_seats: diamond_seats,
        platinum_seats: platinum_seats,
        gold_seats: gold_seats,
        silver_seats: silver_seats,
      });
      if (newEvent) {
        return res.status(200).json({
          success: true,
          message: "Event created",
        });
      } else {
        return res.status(504).json({
          success: false,
          message: "Something went wrong. Please retry",
        });
      }
    }
  } catch (err) {
    return res.status(504).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const data = await eventModel.find();
    if (data) {
      return res.status(200).json({
        success: true,
        message: "All events data",
        data: data,
      });
    } else {
      return res.status(504).json({
        success: false,
        message: "Something went wrong. Please retry",
      });
    }
  } catch (err) {
    return res.status(504).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const data = req.body;
    const exisEvent = await eventModel.findOne({ _id: data?.id });
    if (exisEvent) {
      const delEvent = await eventModel.deleteOne({ _id: data?.id });
      if (delEvent.deletedCount > 0) {
        return res.status(200).json({
          success: true,
          message: "Event deleted successfully",
        });
      } else {
        return res.status(504).json({
          success: false,
          message: "Something went wrong. Please retry.",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
  } catch (err) {
    return res.status(504).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { addEvent, getAllEvents, deleteEvent };
