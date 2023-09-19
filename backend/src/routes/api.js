const express = require("express");

const uploadsRouter = require("./uploads/upload.router");
const productsRouter = require("./products/products.router");

const api = express.Router();

api.use("/uploads", uploadsRouter);

api.use("/products", productsRouter);

module.exports = api;
