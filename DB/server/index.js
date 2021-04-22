const express = require("express");
const app = express();
const { Saved_Questions, All_Data, Questions, Players } = require("../models");
const { Op } = require("sequelize");
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
//get generated question

app.get("/newQuestion", async (req, res) => {
  const randomId = random(1, 21);
  const newQ = await Questions.findOne({
    where: {
      Id: randomId,
    },
  });
  let questionString = "";
  switch (newQ.type) {
    case 1:
  }
  let numberOfOptions;
  if (newQ.type === 1 || newQ.type === 2) {
    numberOfOptions = 2;
  } else {
    numberOfOptions = 4;
  }

  const options = await getCountryFromData(
    newQ["table_column"],
    numberOfOptions
  );
  console.log(options + "---> OPTIONS AT GET!!!!KAKI!!!!");
  const allGivenData = [];
  allGivenData.push(options);
  allGivenData.push(newQ);
  return res.json(allGivenData);
  // .then((results) => {

  //   All_Data.findAll({where:{
  //     id:randomOptionA
  //   }})
  //   console.log(results.map((result) => result.toJSON()));
  //   return res.json(results);
  // })
  // .catch((e) => {
  //   console.log(e);
  //   return res.send(e);
  // });
});
// {
//   q:
//   op1:
//   op2:
//   op3:
//   op4:
//   answer:
// }
// getOptions(column, numberOfOptions)=>{

// }where id in[2 , 3 ,4 ,5]
function getCountryFromData(column, numberOfOptions) {
  console.log(column + "------> COLUMN");
  console.log(numberOfOptions + "------> NUMBER OF OPTION");

  return All_Data.findAll({
    where: {
      id: {
        [Op.or]: [
          random(1, 246),
          random(1, 246),
          random(1, 246),
          random(1, 246),
        ],
      },
    },
    attributes: ["country", column],
    limit: numberOfOptions,
  })
    .then((results) => {
      console.log(results.map((result) => result.toJSON()));
      return results.map((result) => result.toJSON());
    })
    .catch((e) => {
      console.log(e);
    });
}

// All_Data.findAll({
//   where: {
//     Id: randomID,
//   },
// })

// {
//   "id": 2,
//   "type": 1,
//   "table_column": "Population",
//   "tamplate": "Which country is least populous?",
//   "createdAt": "2021-04-22T19:03:48.000Z",
//   "updatedAt": "2021-04-22T19:03:48.000Z"
// }
//GET: /newQ => generate a new q
// get: /savedQ => send a saved one
// post: /savedQ => post question
// put: /rate/id => rate a q
// get: /player=>
// post: /player => score and player name after game round

//*bonus:

// All_Data.findAll({})
//   .then((results) => console.log(results.map((result) => result.toJSON())))
//   .catch((e) => console.log(e));

app.listen(3000, () => {
  console.log("listening on port 3000");
});
