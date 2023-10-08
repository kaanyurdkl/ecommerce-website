const express = require("express");

const usersRouter = require("./users/users.router");
const productsRouter = require("./products/products.router");
const uploadsRouter = require("./uploads/upload.router");

const api = express.Router();

api.use("/users", usersRouter);
api.use("/products", productsRouter);
api.use("/uploads", uploadsRouter);

module.exports = api;
