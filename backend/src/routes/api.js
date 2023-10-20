const express = require("express");

const userRouter = require("./user.router");
const productRouter = require("./product.router");
const orderRouter = require("./order.router");
const uploadRouter = require("./upload.router");

require("dotenv").config();

const api = express.Router();

api.use("/users", userRouter);
api.use("/products", productRouter);
api.use("/orders", orderRouter);
api.use("/uploads", uploadRouter);

api.get("/config/paypal", (res, req) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

module.exports = api;
