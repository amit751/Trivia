const { Router } = require("express");
const savedAnswer = Router();
const { Saved_Questions } = require("../../models");

savedAnswer.get("/:id", async (req, res) => {
  const questionId = req.params.id;
  const answer = await Saved_Questions.findOne({
    where: {
      id: questionId,
    },
    attributes: ["answer"],
  });
  res.json(answer);
});

module.exports = savedAnswer;
