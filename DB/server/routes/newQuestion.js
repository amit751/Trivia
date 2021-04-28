const { Router } = require("express");
const newQuestion = Router();
const { getCountryFromData, random } = require("../utils/functions.js");
const { Questions } = require("../../models");
const { literal } = require("sequelize");

newQuestion.get("/", async (req, res) => {
  let responseObj = {};
  const newQ = await Questions.findOne({
    order: literal("rand()"),
    limit: 1,
  });

  let numberOfOptions;
  if (newQ.question_type === 1 || newQ.question_type === 2) {
    numberOfOptions = 4;
  } else {
    numberOfOptions = 2;
  }

  const options = await getCountryFromData(
    newQ["table_column"],
    numberOfOptions,
    newQ.id
  );

  switch (newQ.question_type) {
    case 1:
      responseObj.question = newQ.tamplate;
      options.map((option, index) => {
        responseObj[`option_${index + 1}`] = option.country;
      });

      break;
    case 2:
      if (newQ.id === 13) {
        responseObj.question = newQ.tamplate.replace("XXX", options.country);
        responseObj["option_1"] = options[newQ.table_column];
        const continents = [
          "Asia",
          "Africa",
          "North America",
          "Central America",
          "South America",
          "Antarctica",
          "Europe",
          "Australia",
        ];
        let optionContinents = continents.filter(
          (continet) => continet !== responseObj.option_1
        );
        let finalOptions = [];
        for (let i = 0; i < 3; i++) {
          finalOptions.push(
            optionContinents.splice(random(0, optionContinents.length), 1)
          );
        }
        finalOptions.map((option, index) => {
          responseObj[`option_${index + 2}`] = option[0];
        });
        responseObj.XXX = options.country;
      } else {
        responseObj.question = newQ.tamplate.replace("XXX", options[0].country);
        options.map((option, index) => {
          responseObj[`option_${index + 1}`] = option[newQ.table_column];
        });
        responseObj.XXX = options[0].country;
      }

      break;
    case 3:
      responseObj.question = newQ.tamplate
        .replace("XXX", options[0].country)
        .replace("YYY", options[1].country);
      responseObj.XXX = options[0].country;
      responseObj.YYY = options[1].country;

      break;
  }
  responseObj["question_type"] = newQ.question_type;
  responseObj["tamplate_id"] = newQ.id;
  responseObj["savedQuestions"] = false;
  responseObj.column = newQ.table_column;
  const allGivenData = [];
  allGivenData.push(options);
  allGivenData.push(newQ);
  allGivenData.push(responseObj);
  return res.json(responseObj);
});

module.exports = newQuestion;
