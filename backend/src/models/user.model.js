const user = require("./user.mongo");

const sampleUsers = require("../../data/users.json");

async function deleteAllUsers() {
  try {
    await user.deleteMany();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function createSampleUsers() {
  try {
    const createdUsers = await user.insertMany(sampleUsers);
    return createdUsers;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

module.exports = { deleteAllUsers, createSampleUsers };
