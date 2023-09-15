const order = require("./order.mongo");

async function deleteAllOrders() {
  try {
    await order.deleteMany();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

module.exports = { deleteAllOrders };
