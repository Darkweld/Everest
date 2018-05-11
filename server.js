"use strict";

const express = require("express");
const routes = require("./app/server/routes.js");

const app = express();
require("dotenv").load();

app.set("view engine", "ejs");
app.set("views", "public/views");

app.use("/public", express.static(process.cwd() + "/public"));
app.use("/dist", express.static(process.cwd() + "/dist"));
app.use("/assets", express.static(process.cwd() + "/public/assets"));

routes(app);

app.listen(process.env.PORT || 8080);

