const express = require("express");

const { getAuthUser, getAllUsers } = require("./users.controller");

const usersRouter = express.Router();

usersRouter.get("/auth", getAuthUser);
usersRouter.get("/", getAllUsers);

module.exports = usersRouter;
