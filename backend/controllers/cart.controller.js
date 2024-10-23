const eventModel = require("../models/events.model");
const userModel = require("../models/user.model");
const cartModel = require("../models/cart.model");

const addToCart = async (req, res) => {
  try {
    const { eventID, userID, price, quantity, seating } = req.body;
    const exisUser = await userModel.findOne({ _id: userID });
    if (exisUser) {
      const exisEvent = await eventModel.findOne({ _id: eventID });
      if (exisEvent) {
        const addItem = await cartModel.create({
          event: eventID,
          user: userID,
          price: price,
          quantity: quantity,
          seating: seating,
        });
        if (addItem) {
          return res.status(200).json({
            success: true,
            message: "Added to cart successfully",
          });
        } else {
          return res.status(504).json({
            success: false,
            message: "Something went wrong",
          });
        }
      } else {
        return res.status(404).json({
          success: false,
          message: "This Event doesn't exist",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "This User doesn't exist",
      });
    }
  } catch (err) {
    return res.status(504).json({
      success: false,
      message: err.message,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const { userID } = req.body;
    const exisUser = await userModel.findOne({ _id: userID });
    if (exisUser) {
      const getItems = await cartModel.find({ user: userID }).populate("event");
      if (getItems) {
        return res.status(200).json({
          success: true,
          message: "All cart items of user",
          data: getItems,
        });
      } else {
        return res.status(504).json({
          success: false,
          message: "Something went wrong",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "This User doesn't exist",
      });
    }
  } catch (err) {
    return res.status(504).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.body;
    const exisItem = await cartModel.findOne({ _id: id });
    if (exisItem) {
      const del = await cartModel.deleteOne({ _id: id });
      if (del.deletedCount > 0) {
        return res.status(200).json({
          success: true,
          message: "Item deleted",
        });
      } else {
        return res.status(504).json({
          success: false,
          message: "Something went wrong",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }
  } catch (err) {
    return res.status(504).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { addToCart, getCart, deleteItem };
