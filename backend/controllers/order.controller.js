const Razorpay = require("razorpay");
require("dotenv").config();
const crypto = require("crypto");
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const eventModel = require("../models/events.model");
const orderModel = require("../models/order.model");
const userModel = require("../models/user.model");
const cartModel = require("../models/cart.model");

const createOrder = async (req, res) => {
  try {
    const { amount, product } = req.body;
    const order = await instance.orders.create({
      amount: amount,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        products: product,
      },
    });
    if (order) {
      return res.status(200).json({
        success: true,
        message: "Order created",
        data: order,
      });
    } else {
      return res.status(504).json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (err) {
    return res.status(504).json({
      success: false,
      message: err.message,
    });
  }
};

const verifyOrder = async (req, res) => {
  try {
    const { paymentID, orderID, signature } = req.body;
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    sha.update(`${orderID}|${paymentID}`);
    const digest = sha.digest("hex");
    if (digest == signature) {
      return res.status(200).json({
        success: true,
        message: "Payment successful",
      });
    } else {
      return res.status(504).json({
        success: false,
        message: "Payment unsuccessful",
      });
    }
  } catch (err) {
    return res.status(504).json({
      success: false,
      message: err.message,
    });
  }
};

const addOrder = async (req, res) => {
  try {
    const { products, userID, orderID, paymentID, signature, cart } = req.body;
    const exisUser = await userModel.findOne({ _id: userID });
    if (exisUser) {
      const newOrder = await orderModel.create({
        user: userID,
        products: products,
        orderID: orderID,
        paymentID: paymentID,
        signature: signature,
      });
      if (newOrder) {
        let updateEvent = products.map(async (prod) => {
          await eventModel
            .updateOne(
              { _id: prod._id },
              { $inc: { [prod.seat]: -prod.quantity } }
            )
            .then((resp) => {
              const final = cart.map(async (item) => {
                await cartModel
                  .deleteOne({ _id: item._id })
                  .then((response) => {
                    if (response.deletedCount >= 0) {
                      return res.status(200).json({
                        success: true,
                        message: "Order created",
                      });
                    }
                  })
                  .catch((err) => console.log(err));
              });
            })
            .catch((err) => console.log(err));
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
        message: "No User found",
      });
    }
  } catch (err) {
    return res.status(504).json({
      success: false,
      message: err.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const { userID } = req.body;
    const exisUser = await userModel.findOne({ _id: userID });
    if (exisUser) {
      const getOrdersData = await orderModel.find({ user: userID });
      if (getOrdersData) {
        return res.status(200).json({
          success: true,
          message: "All Orders",
          data: getOrdersData,
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
        message: "No User found",
      });
    }
  } catch (err) {
    return res.status(504).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { createOrder, verifyOrder, addOrder, getOrders };
