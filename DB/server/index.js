const { All_Data } = require("../models");
const { Questions } = require("../models");
const { Op } = require("sequelize");

All_Data.findAll({})
  .then((results) => console.log(results.map((result) => result.toJSON())))
  .catch((e) => console.log(e));
