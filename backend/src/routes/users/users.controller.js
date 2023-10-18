const Users = require("../../models/user.mongo");

function getAuthUser(req, res) {
  if (req.isAuthenticated() && req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
}
async function getAllUsers(req, res) {
  const users = await Users.find({});

  res.status(200).json(users);
}

module.exports = { getAuthUser, getAllUsers };
