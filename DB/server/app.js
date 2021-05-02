const express = require("express");
const cors = require("cors");

const getNewAnswer = require("./routes/getNewAnswer");
const newQuestion = require("./routes/newQuestion");
const players = require("./routes/players");
const rate = require("./routes/rate");
const savedAnswer = require("./routes/savedAnswer");
const savedQuestion = require("./routes/savedQuestion");
const users = require("./routes/users");
const { validator } = require("./middlewares/validator");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/permition", validator, (req, res) => {
    res.send(true);
});
app.use("/getNewAnswer", validator, getNewAnswer);
app.use("/newQuestion", validator, newQuestion);
app.use("/players", validator, players);
app.use("/rate", validator, rate);
app.use("/savedAnswer", validator, savedAnswer);
app.use("/savedQuestion", validator, savedQuestion);
app.use("/users", users);

module.exports = app;
