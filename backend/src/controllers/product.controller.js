const Product = require("../models/product.model");

const productsData = require("../../data/products.json");

async function httpGetAllLProducts(req, res) {
  const products = await Product.find({}, { __v: 0 });
  return res.status(200).json(products);
}

async function httpCreateProduct(req, res) {
  const { image } = req.body;
  const product = new Product({
    user: req.user._id,
    name: "Sample name",
    image,
    category: "men",
    type: "t-shirts",
    description: "Some description",
    price: 0,
  });

  const createdProduct = await product.save();

  return res.status(201).json(createdProduct);
}

async function httpCreateSampleProducts(adminUser) {
  try {
    const sampleProducts = productsData.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function httpUpdateProduct(req, res) {
  const { name, image, category, type, description, price } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.image = image;
    product.category = category;
    product.type = type;
    product.description = description;
    product.price = price;

    const updatedProduct = await product.save();
    return res.status(200).json(updatedProduct);
  } else {
    return res.status(404).json({ message: "Product not found" });
  }
}

async function httpDeleteAllProducts() {
  try {
    await Product.deleteMany();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function httpDeleteProduct(req, res) {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
}

module.exports = {
  httpGetAllLProducts,
  httpCreateProduct,
  httpCreateSampleProducts,
  httpUpdateProduct,
  httpDeleteAllProducts,
  httpDeleteProduct,
};
