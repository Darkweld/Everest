"use strict";

const express = require("express");
const routes = require("./app/server/routes.js");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");

const app = express();
require("dotenv").load();

mongoose.connect(process.env.MONGO_URI);

app.set("view engine", "ejs");
app.set("views", "public/views");

app.use("/public", express.static(process.cwd() + "/public"));
app.use("/dist", express.static(process.cwd() + "/dist"));

app.use(session({	secret: process.env.sessionSecret,
"resave": false,
"saveUninitialized": false,
"cookie": {"expires": false, "maxAge": 3 * 24 * 60 * 60 * 1000}
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

app.listen(process.env.PORT || 8080);
