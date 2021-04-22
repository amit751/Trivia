const express = require("express");
const app = express();
const { Saved_Questions } = require("../models");
// const { Questions } = require("../models");
const { Op } = require("sequelize");
//get generated question
app.get("/newQA", (req, res) => {
  const id = Math.floor(Math.random() * (21 - 1)) + 1;
  // Post.findAll({
  //   where: {
  //     authorId: 2
  //   }
  // });
});

// All_Data.findAll({})
//   .then((results) => console.log(results.map((result) => result.toJSON())))
//   .catch((e) => console.log(e));

app.listen(3000, () => {
  console.log("listening on port 3000");
});

// Saved_Questions.create(
//   {
//     question:
//       "ertyytrrtttttttttttttttttttttttttttttttttttttttttttttttttttttt tryyyyyyyyyyyyyyyyyyyyy",
//     answer: "TEST55555",
//     options: "33, TESTsssss ,TEST33",
//   },
//   { fields: ["question", "answer", "options"] } // setting isActive field attempt will be ignored
// )
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });
