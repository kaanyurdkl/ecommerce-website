const express = require("express");
const path = require("path");

const api = require("./routes/api");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "/uploads")));

app.use("/api", api);

module.exports = app;
