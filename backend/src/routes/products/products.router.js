const express = require("express");

const { httpGetAllLProducts } = require("./products.controller");

const productsRouter = express.Router();

productsRouter.get("/", httpGetAllLProducts);

module.exports = productsRouter;
