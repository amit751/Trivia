//imports

const express = require("express");
const app = express();
const {
  Saved_Questions,
  All_Data,
  Questions,
  Players,
  sequelize,
} = require("../models");
const { Op, literal, Sequelize } = require("sequelize");
app.use(express.json());
const { getAnswer } = require("../utils/functions");
const cors = require("cors");
app.use(cors());

//functions
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

function getCountryFromData(column, numberOfOptions, questionID) {
  if (questionID === 13) {
    console.log("in 13");
    return All_Data.findOne({
      attributes: [column, "country"],
      order: literal("rand()"),
      limit: 1,
    })
      .then((result) => {
        return result.toJSON();
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    console.log(" not in 13");
    return All_Data.findAll({
      where: {
        [column]: { [Op.not]: null },
      },
      attributes: ["country", column],
      order: literal("rand()"),
      limit: numberOfOptions,
    })
      .then((results) => {
        return results.map((result) => result.toJSON());
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

///api
//GET: /newQ => generate a new q ================
// get: /savedQ => send a saved one ===============
// post: /savedQ => post question ================
// patch: /rate/id => rate a q ==================
// get: /player=>
// post: /player => score and player name after game round=================
//post : get answer:

app.post("/players", async (req, res) => {
  const data = req.body;
  const result = await Players.create(data, { fields: ["name", "score"] });
  res.json(result);
});
app.get("/players", async (req, res) => {
  const players = await Players.findAll({});
  res.json(players);
});

app.get("/newQuestion", async (req, res) => {
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

app.get("/savedQuestion", (req, res) => {
  Saved_Questions.findAll({}).then((savedQuestionsBad) => {
    let savedQuestions = [];
    savedQuestionsBad.map((result) => {
      savedQuestions.push(result.toJSON());
    });
    console.log(savedQuestions);

    let pickAQuestion = [];
    for (const question of savedQuestions) {
      for (let i = 1; i <= question.avg_rate; i++) {
        pickAQuestion.push(question);
      }
    }
    let responseObj = {};
    let pickedQuestion = pickAQuestion[random(0, pickAQuestion.length)];

    responseObj.question = pickedQuestion.question;
    responseObj.savedQuestionID = pickedQuestion.id;
    responseObj["option_1"] = pickedQuestion.option_1;
    responseObj["option_2"] = pickedQuestion.option_2;
    responseObj["option_3"] = pickedQuestion.option_3 || null;
    responseObj["option_4"] = pickedQuestion.option_4 || null;
    responseObj["question_type"] = pickedQuestion.question_type;
    responseObj["tamplate_id"] = pickedQuestion.tamplate_id;
    responseObj["savedQuestions"] = true;

    res.json(responseObj);
  });
});

// {
("xxx");
("yyy");
("column");
// "question
//  "answer
// "option_1
// "option_2
// "option_3
// "option_4
// "tamplate_id
// "question_type
// "avg_rate
// "total_rating
// "total_votes"
// }
app.post("/savedQuestion", async (req, res) => {
  const data = req.body;
  console.log(data, "this is data");
  data.answer = await getAnswer(data);
  console.log("final answerr in api", data.answer);

  Saved_Questions.create(data, {
    fields: [
      "question",
      "answer",
      "option_1",
      "option_2",
      "option_3",
      "option_4",
      "tamplate_id",
      "question_type",
      "avg_rate",
      "total_rating",
      "total_votes",
    ],
  }).then((result) => {
    console.log(result);
    return res.json(result);
  });
});

app.post("/rate/:id", async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const question = await Saved_Questions.findOne({
    where: {
      id: id,
    },
  });
  const { avg_rate, total_rating, total_votes } = question;
  question["total_rating"] = total_rating + data.rate;
  question["total_votes"] = total_votes + 1;
  question["avg_rate"] = (total_rating + data.rate) / (total_votes + 1);
  const result = await question.save();

  res.json(result);
});

app.get("/savedAnswer/:id", async (req, res) => {
  const questionId = req.params.id;
  const answer = await Saved_Questions.findOne({
    where: {
      id: questionId,
    },
    attributes: ["answer"],
  });
  res.json(answer);
});
app.post("/getNewAnswer", async (req, res) => {
  try {
    const data = req.body;
    const answer = {};
    answer.answer = await getAnswer(data);
    res.json(answer);
  } catch (e) {
    console.log(e);
  }
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
