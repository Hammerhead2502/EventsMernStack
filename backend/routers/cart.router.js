const {
  addToCart,
  getCart,
  deleteItem,
} = require("../controllers/cart.controller");
const express = require("express");
const router = express.Router();

router.post("/add-to-cart", addToCart);
router.post("/get-cart", getCart);
router.delete("/delete-item", deleteItem);

module.exports = router;
