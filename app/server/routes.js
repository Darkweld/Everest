"use strict";

//const serverController = require("./serverController.js");

module.exports = (app, passport) => {
//const server = new serverController(passport);

app.route("/")
  .get((req, res) => res.render("index"));

};

