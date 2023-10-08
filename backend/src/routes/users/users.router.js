const express = require("express");

const { getAuthUser } = require("./users.controller");

const usersRouter = express.Router();

usersRouter.get("/auth", getAuthUser);

module.exports = usersRouter;
