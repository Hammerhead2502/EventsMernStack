const express = require("express");
const router = express.Router();
const {
  createOrder,
  verifyOrder,
  addOrder,
  getOrders,
} = require("../controllers/order.controller");

router.post("/create-order", createOrder);
router.post("/verify-order", verifyOrder);
router.post("/add-order", addOrder);
router.post("/get-orders", getOrders);

module.exports = router;
