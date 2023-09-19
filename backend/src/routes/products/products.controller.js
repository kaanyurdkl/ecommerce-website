const { getAllProducts } = require("../../models/products.model");

async function httpGetAllLProducts(req, res) {
  const products = await getAllProducts();
  return res.status(200).json(products);
}

module.exports = { httpGetAllLProducts };
