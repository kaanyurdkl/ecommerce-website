const User = require("../models/user.model");

const sampleUsers = require("../../data/users.json");

async function createSampleUsers() {
  try {
    const createdUsers = await User.insertMany(sampleUsers);
    return createdUsers;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

function getAuthUser(req, res) {
  if (req.isAuthenticated() && req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
}

async function getAllUsers(req, res) {
  const users = await User.find({});

  res.status(200).json(users);
}

async function deleteAllUsers() {
  try {
    await User.deleteMany();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

module.exports = {
  createSampleUsers,
  getAuthUser,
  getAllUsers,
  deleteAllUsers,
};
