const express = require("express");
const app = express();
const { All_Data } = require("../models");
const { Questions } = require("../models");
const { Op } = require("sequelize");

All_Data.findAll({})
  .then((results) => console.log(results.map((result) => result.toJSON())))
  .catch((e) => console.log(e));

app.listen(3000, () => {
  console.log("listening on port 3000");
});
