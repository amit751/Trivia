const express = require("express");
const app = express();
const {
  Saved_Questions,
  All_Data,
  Questions,
  Players,
  sequelize,
} = require("../models");
const { Op, literal } = require("sequelize");
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

app.get("/newQuestion", async (req, res) => {
  const randomId = random(1, 21);
  const newQ = await Questions.findOne({
    where: {
      Id: randomId,
    },
  });
  // let questionString = "";
  switch (newQ.type) {
    case 1:
  }
  let numberOfOptions;
  if (newQ.type === 1 || newQ.type === 2) {
    numberOfOptions = 4;
  } else {
    numberOfOptions = 2;
  }

  const options = await getCountryFromData(
    newQ["table_column"],
    numberOfOptions
  );
  const allGivenData = [];
  allGivenData.push(options);
  allGivenData.push(newQ);
  return res.json(allGivenData);
});

function getCountryFromData(column, numberOfOptions) {
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

//GET: /newQ => generate a new q
// get: /savedQ => send a saved one
// post: /savedQ => post question
// patch: /rate/id => rate a q
// get: /player=>
// post: /player => score and player name after game round

//*bonus:

// All_Data.findAll({})
//   .then((results) => console.log(results.map((result) => result.toJSON())))
//   .catch((e) => console.log(e));

app.listen(3000, () => {
  console.log("listening on port 3000");
});
