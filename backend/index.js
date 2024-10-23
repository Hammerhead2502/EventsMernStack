const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routers/user.router");
const eventRouter = require("./routers/events.router");
const cartRouter = require("./routers/cart.router");
const orderRouter = require("./routers/order.router");
const cookieParser = require("cookie-parser")
require("dotenv").config()

app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("DB connected"));

app.use(userRouter);
app.use(eventRouter);
app.use(cartRouter);
app.use(orderRouter);
app.use(cookieParser)

app.listen(3000);
