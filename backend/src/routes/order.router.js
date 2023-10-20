const express = require("express");

const {
  httpGetAllOrders,
  httpCreateOrder,
  httpGetUserOrders,
  httpGetOrderById,
  httpUpdateOrderToPaid,
  httpUpdateOrderToDelivered,
} = require("../controllers/order.controller");

const orderRouter = express.Router();

orderRouter.get("/", httpGetAllOrders);
orderRouter.post("/", httpCreateOrder);
orderRouter.get("/myorders", httpGetUserOrders);
orderRouter.get("/:id", httpGetOrderById);
orderRouter.put("/:id/pay", httpUpdateOrderToPaid);
orderRouter.put("/:id/deliver", httpUpdateOrderToDelivered);

module.exports = orderRouter;
