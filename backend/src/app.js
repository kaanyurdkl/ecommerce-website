const express = require("express");
const products = require("../data/products.json");

const app = express();

app.use(express.json());

app.get("/api/products", (req, res) => {
  res.status(200).json(products);
});

module.exports = app;
