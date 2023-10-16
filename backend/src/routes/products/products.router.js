const express = require("express");

const { httpGetAllLProducts } = require("./products.controller");

const Products = require("../../models/products.mongo");

const productsRouter = express.Router();

productsRouter.get("/", httpGetAllLProducts);
productsRouter.post("/", async (req, res) => {
  const product = new Products({
    user: req.user._id,
    name: "Sample name",
    image: "/images/tshirt5.jpg",
    category: "men",
    type: "t-shirts",
    description: "Some description",
    price: 0,
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
});
productsRouter.put("/:id", async (req, res) => {
  const { name, image, category, type, description, price } = req.body;

  const product = await Products.findById(req.params.id);

  if (product) {
    product.name = name;
    product.image = image;
    product.category = category;
    product.type = type;
    product.description = description;
    product.price = price;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(404).json({ message: "Resource not found" });
  }
});

module.exports = productsRouter;
