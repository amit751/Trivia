
//imports
const DB = require ("../models/index.js")
const express = require("express");
const app = express();
const {Saved_Questions,All_Data,Questions,Players, sequelize} = require("../models");
const { Op, literal , Sequelize   } = require("sequelize");
// const Sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');
app.get("/" , async (req , res)=>{
  const users = await sequelize.query("SELECT Continent , country FROM country_trivia.all_data group by Continent order by rand() limit 4  ", );
  res.send(users);
})

//const users = await sequelize.query("SELECT * FROM `users`", { type: QueryTypes.SELECT });
// Project.findAll({
//   attributes: [
//       // specify an array where the first element is the SQL function and the second is the alias
//       [Sequelize.fn('DISTINCT', Sequelize.col('country')) ,'country'],

//       // specify any additional columns, e.g. country_code
//       // 'country_code'

//   ]
// }).then(function(country) {  })
// [Sequelize.fn('DISTINCT', Sequelize.col(column)) ,column],
// async function getRandomValuesFromColumn(column, num = 1, filterId = null) {
//   const filter = { id: { [Op.ne]: filterId } };
//   filter[column] = { [Op.not]: null };

//   return Country.findAll({
//       where: filter,
//       order: Sequelize.literal('rand()'),
//       limit: num,
//       attributes:[ [Sequelize.fn('DISTINCT', Sequelize.col(column)), column] ]
//   })
//   .then( countries => countries.map( country => country.toJSON() ) )
// }

//functions
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

function getCountryFromData(column, numberOfOptions , questionID) {
  if(questionID === 13){
    let options = []
   
    console.log("in 13");
    return All_Data.findAll({
      attributes:  [Sequelize.literal(`DISTINCT ('${column}') as ${column}`) , "country" , column ],
      // attributes: [ [Sequelize.fn('DISTINCT', Sequelize.col(column)) ,column] , "country" ].concat(Object.keys(All_Data.rawAttributes)),
      order: literal("rand()"),
      limit: numberOfOptions,
     
    })
      .then((results) => {
        return results.map((result) => result.toJSON());
      })
      .catch((e) => {
        console.log(e);
      });
  }else{
    console.log(" not in 13");
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
  }







///api
//GET: /newQ => generate a new q
// get: /savedQ => send a saved one
// post: /savedQ => post question
// patch: /rate/id => rate a q
// get: /player=>
// post: /player => score and player name after game round


app.get("/newQuestion", async (req, res) => {
  let responseObj = {};
  const newQ = await Questions.findOne({
    where: {id:13},
    order: literal("rand()"),
    limit: 1,
  });

  let numberOfOptions;
  if (newQ.type === 1 || newQ.type === 2) {
    numberOfOptions = 4;
  } else {
    numberOfOptions = 2;
  }

  const options = await getCountryFromData(
    newQ["table_column"],
    numberOfOptions , 
    newQ.id
  );

  switch(newQ.type) {
    case 1:
    responseObj.question = newQ.tamplate
    responseObj.option1 = options[0].country;
    responseObj.option2 = options[1].country;
    responseObj.option3 = options[2].country;
    responseObj.option4 = options[3].country;
    break;
    case 2:
      if (newQ.id === 13){
        const optionContinents = ['Asia','Africa','North America','Central America','South America','Antarctica','Europe','Australia']
        let optionContinentsWithoutAnswer = optionContinents.filter(continet => continet !== options[0][newQ.table_column])
        responseObj.question = newQ.tamplate.replace('XXX', options[0].country);
        responseObj.option1=options[0][newQ.table_column];
        responseObj.option2=optionContinentsWithoutAnswer[random()]
        optionContinentsWithoutAnswer = optionContinentsWithoutAnswer.filter(continet => continet !== responseObj.option2)
        responseObj.option3=optionContinentsWithoutAnswer[random()]
        optionContinentsWithoutAnswer = optionContinentsWithoutAnswer.filter(continet => continet !== responseObj.option3)
        responseObj.option4=optionContinentsWithoutAnswer[random()]
      }
      
      break;
    case 3:
      responseObj.question = newQ.tamplate.replace('XXX',options[0].country).replace('YYY',options[1].country);
      responseObj.XXX=options[0].country;
      responseObj.YYY=options[1].country;
      responseObj.column = newQ[table_column];
      break;

  }

  const allGivenData = [];
  allGivenData.push(options);
  allGivenData.push(newQ);
  return res.json(allGivenData);
});

app.get('/savedQuestion', (req, res)=>{
  Saved_Questions.findAll({}).then(savedQuestions=>{
    let sumOfAvgVotes = 0;
    //q1-3  q2-5    q3-1    q4-2   q5-2
    //3+5+1+2+2 = 13
    //[q1,q1,q1,q2,q2,q2,q2,q2,q3,q4,q4,q5,q5]
    savedQuestions.map(question=>sumOfAvgVotes = sumOfAvgVotes + question.avg_vote);

    let pickAQuestion = []
    for (const question of savedQuestions){
      for(let i = 1 ; i <= question.avg_vote ; i++){
        pickAQuestion.push(question);
      }
    }
    let responseObj = {}
    let pickedQuestion = pickAQuestion[random(0,pickAQuestion.length)];
    let responseObj = {}
    responseObj.question = pickedQuestion.question
    responseObj.questionID = pickedQuestion.id
    responseObj.option1 = pickedQuestion[option_1]
    responseObj.option2 = pickedQuestion[option_2]
    responseObj.option3 = pickedQuestion[option_3] || null
    responseObj.option4 = pickedQuestion[option_4] || null
    res.send()
  })
})


app.listen(3000, () => {
  console.log("listening on port 3000");
});
