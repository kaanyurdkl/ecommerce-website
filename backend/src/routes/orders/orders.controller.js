const Order = require("../../models/order.mongo");
async function httpGetAllOrders(req, res) {}
async function httpAddNewOrders(req, res) {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: "No order items" });
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems: orderItems.map((item) => ({
        ...item,
        product: item._id,
        _id: undefined,
      })),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
}
async function httpGetUserOrders(req, res) {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json(orders);
}
async function httpGetOrderById(req, res) {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({ message: "Order not found!" });
  }
}
async function httpUpdateOrderToPaid(req, res) {}
async function httpUpdateOrderToDelivered(req, res) {}

module.exports = {
  httpGetAllOrders,
  httpAddNewOrders,
  httpGetUserOrders,
  httpGetOrderById,
  httpUpdateOrderToPaid,
  httpUpdateOrderToDelivered,
};
