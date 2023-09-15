require("dotenv").config();

const { mongoConnect } = require("./src/services/mongo");

const { deleteAllOrders } = require("./src/models/order.model");
const {
  createSampleProducts,
  deleteAllProducts,
} = require("./src/models/product.model");
const {
  deleteAllUsers,
  createSampleUsers,
} = require("./src/models/user.model");

const deleteAllData = async () => {
  await deleteAllOrders();
  await deleteAllProducts();
  await deleteAllUsers();
};

const importData = async () => {
  try {
    await deleteAllData();

    const createdUsers = await createSampleUsers();

    const adminUser = createdUsers[0]._id;

    await createSampleProducts(adminUser);

    console.log("Data imported!");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await deleteAllData();
    console.log("Data destroyed!");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  await mongoConnect();
};

seedDatabase();

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
