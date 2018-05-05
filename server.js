"use strict";

var express = require("express");
var routes = require("./app/server/routes.js");
var mongoose = require("mongoose");
var passport = require("passport");
var session = require("express-session");

var app = express();
require("dotenv").load();

mongoose.connect(process.env.MONGO_URI);

app.set("view engine", "ejs");
app.set("views", "public/views");

app.use("/controllers", express.static(process.cwd() + "/app/controllers"));
app.use("/public", express.static(process.cwd() + "/public"));
app.use("/css", express.static(process.cwd() + "/public/css"));

app.use(session({secret: process.env.sessionSecret,
"resave": false,
"saveUninitialized": false,
"cookie": {"expires": false, "maxAge": 3 * 24 * 60 * 60 * 1000}
}));

//app.use(passport.initialize());
//app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log("Server listening on port " + port + "...");
});
