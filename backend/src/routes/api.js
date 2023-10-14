const express = require("express");

const usersRouter = require("./users/users.router");
const productsRouter = require("./products/products.router");
const ordersRouter = require("./orders/orders.router");
const uploadsRouter = require("./uploads/upload.router");

require("dotenv").config();

const api = express.Router();

api.use("/users", usersRouter);
api.use("/orders", ordersRouter);
api.use("/products", productsRouter);
api.use("/uploads", uploadsRouter);

api.get("/config/paypal", (res, req) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

module.exports = api;
