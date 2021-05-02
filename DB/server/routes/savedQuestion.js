const { Router } = require("express");
const savedQuestion = Router();
const { getAnswer, random } = require("../utils/functions.js");
const { Saved_Questions } = require("../../models");

savedQuestion.get("/", (req, res) => {
  Saved_Questions.findAll({})
    .then((savedQuestionsJson) => {
      const savedQuestions = savedQuestionsJson.map((result) =>
        result.toJSON()
      );

      if (savedQuestions.toString() === [].toString()) {
        return res.json({ data: false });
      } else {
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
        responseObj.data = true;
        return res.json(responseObj);
      }
    })
    .catch((e) => console.log(e));
});

savedQuestion.post("/", async (req, res) => {
  const data = req.body;

  data.answer = await getAnswer(data);

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
    return res.json(result);
  });
});

module.exports = savedQuestion;
