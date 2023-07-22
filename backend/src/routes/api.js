const express = require("express");

const uploadRouter = require("./upload.router");

const products = require("../../data/products.json");

const api = express.Router();

api.use("/upload", uploadRouter);

api.get("/products", (req, res) => {
  res.status(200).json(products);
});

module.exports = api;
