const express = require("express");

const {
  httpGetAllOrders,
  httpAddNewOrders,
  httpGetUserOrders,
  httpGetOrderById,
  httpUpdateOrderToPaid,
  httpUpdateOrderToDelivered,
} = require("./orders.controller");

const ordersRouter = express.Router();

ordersRouter.get("/", httpGetAllOrders);
ordersRouter.post("/", httpAddNewOrders);
ordersRouter.get("/myorders", httpGetUserOrders);
ordersRouter.get("/:id", httpGetOrderById);
ordersRouter.put("/:id/pay", httpUpdateOrderToPaid);
ordersRouter.put("/:id/deliver", httpUpdateOrderToDelivered);

module.exports = ordersRouter;
