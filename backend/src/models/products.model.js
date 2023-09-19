const products = require("./products.mongo");

const productsData = require("../../data/products.json");

async function deleteAllProducts() {
  try {
    await products.deleteMany();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function createSampleProducts(adminUser) {
  try {
    const sampleProducts = productsData.map((product) => {
      return { ...product, user: adminUser };
    });

    await products.insertMany(sampleProducts);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function getAllProducts() {
  return await products.find({}, { __v: 0 });
}

module.exports = { createSampleProducts, deleteAllProducts, getAllProducts };
