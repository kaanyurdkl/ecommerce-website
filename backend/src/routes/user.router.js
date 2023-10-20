const express = require("express");

const { getAuthUser, getAllUsers } = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/auth", getAuthUser);
userRouter.get("/", getAllUsers);

module.exports = userRouter;
