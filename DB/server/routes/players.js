const { Router } = require("express");
const players = Router();
const { Players } = require("../../models");

players.post("/", async (req, res) => {
  const data = req.body;
  const result = await Players.create(data, { fields: ["name", "score"] });
  res.json(result);
});
players.get("/", async (req, res) => {
  const players = await Players.findAll({
    order: [["score", "DESC"]],
  });
  res.json(players);
});

module.exports = players;
