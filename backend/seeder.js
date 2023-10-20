const { mongoConnect } = require("./src/services/mongo");

const { httpDeleteAllOrders } = require("./src/controllers/order.controller");
const {
  httpCreateSampleProducts,
  httpDeleteAllProducts,
} = require("./src/controllers/product.controller");
const {
  deleteAllUsers,
  createSampleUsers,
} = require("./src/controllers/user.controller");

const deleteAllData = async () => {
  await httpDeleteAllOrders();
  await httpDeleteAllProducts();
  await deleteAllUsers();
};

const importData = async () => {
  try {
    await deleteAllData();

    const createdUsers = await createSampleUsers();

    const adminUser = createdUsers[0]._id;

    await httpCreateSampleProducts(adminUser);

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

  if (process.argv[2] === "-d") {
    destroyData();
  } else {
    importData();
  }
};

seedDatabase();
