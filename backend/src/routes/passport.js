const express = require("express");
const passport = require("passport");

const passportRouter = express.Router();

passportRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
    prompt: "select_account",
  })
);
passportRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: true,
  }),
  (req, res) => {}
);

passportRouter.get("/logout", (req, res) => {
  req.logout();
  return res.redirect("/");
});

passportRouter.get("/failure", (req, res) => {
  return res.send("Failed to log in!");
});

module.exports = passportRouter;
