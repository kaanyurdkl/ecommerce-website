const product = require("./product.mongo");

const products = require("../../data/products.json");

async function deleteAllProducts() {
  try {
    await product.deleteMany();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function createSampleProducts(adminUser) {
  try {
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await product.insertMany(sampleProducts);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

module.exports = { createSampleProducts, deleteAllProducts };
