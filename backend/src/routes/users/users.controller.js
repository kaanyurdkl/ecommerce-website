function getAuthUser(req, res) {
  if (req.isAuthenticated() && req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
}

module.exports = { getAuthUser };
