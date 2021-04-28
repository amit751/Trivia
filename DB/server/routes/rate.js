const { Router } = require("express");
const rate = Router();

const { Saved_Questions } = require("../../models");

rate.post("/:id", async (req, res) => {
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

module.exports = rate;
