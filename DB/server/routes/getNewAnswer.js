const { Router } = require("express");
const getNewAnswer = Router();

const { getAnswer } = require("../utils/functions.js");

getNewAnswer.post("/", async (req, res) => {
  try {
    const data = req.body;
    const answer = {};
    answer.answer = await getAnswer(data);
    res.json(answer);
  } catch (e) {
    console.log(e);
  }
});

module.exports = getNewAnswer;
