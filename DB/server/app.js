const express = require("express");
const cors = require("cors");

const getNewAnswer = require("./routes/getNewAnswer");
const newQuestion = require("./routes/newQuestion");
const players = require("./routes/players");
const rate = require("./routes/rate");
const savedAnswer = require("./routes/savedAnswer");
const savedQuestion = require("./routes/savedQuestion");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/getNewAnswer", getNewAnswer);
app.use("/newQuestion", newQuestion);
app.use("/players", players);
app.use("/rate", rate);
app.use("/savedAnswer", savedAnswer);
app.use("/savedQuestion", savedQuestion);

module.exports = app;
