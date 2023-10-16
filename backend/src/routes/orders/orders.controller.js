const Order = require("../../models/order.mongo");
async function httpGetAllOrders(req, res) {
  const orders = await Order.find({}).populate("user", "id name");
  res.status(200).json(orders);
}
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
async function httpUpdateOrderToPaid(req, res) {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
}
async function httpUpdateOrderToDelivered(req, res) {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
}

module.exports = {
  httpGetAllOrders,
  httpAddNewOrders,
  httpGetUserOrders,
  httpGetOrderById,
  httpUpdateOrderToPaid,
  httpUpdateOrderToDelivered,
};
