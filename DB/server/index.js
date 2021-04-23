
//imports

const express = require("express");
const app = express();
const {Saved_Questions,All_Data,Questions,Players, sequelize} = require("../models");
const { Op, literal , Sequelize } = require("sequelize");
const { QueryTypes } = require('sequelize');
app.use(express.json());
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
    console.log("in 13");
    return All_Data.findOne({
      attributes:  [column , "country"],
      // attributes: [ [Sequelize.fn('DISTINCT', Sequelize.col(column)) ,column] , "country" ].concat(Object.keys(All_Data.rawAttributes)),
      order: literal("rand()"),
      limit: 1,
     
    })
      .then((result) => {
        return  result.toJSON();
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
    options.map((option , index)=>{
      responseObj[`option${index+1}`] = option.country
    })
    break;
    case 2:
      if (newQ.id === 13){
        responseObj.question = newQ.tamplate.replace('XXX', options.country);
        responseObj.option1=options[newQ.table_column];
        const continents = ['Asia','Africa','North America','Central America','South America','Antarctica','Europe','Australia']
        let optionContinents = continents.filter(continet => continet !== responseObj.option1);
        let finalOptions =[];
        for(let i=0 ; i < 3 ;i++){
          finalOptions.push(optionContinents.splice(random(0 , optionContinents.length) , 1))
        }
        finalOptions.map((option , index)=>{
          responseObj[`option${index+2}`] = option[0];
        })
       
      }else{
        responseObj.question = newQ.tamplate.replace('XXX', options[0].country);
        options.map((option , index)=>{
          responseObj[`option${index+1}`] = option[newQ.table_column]
        })
      }
      
      break;
    case 3:
      responseObj.question = newQ.tamplate.replace('XXX',options[0].country).replace('YYY',options[1].country);
      responseObj.XXX=options[0].country;
      responseObj.YYY=options[1].country;
      responseObj.column = newQ.table_column;
      break;

  }
   
  const allGivenData = [];
  allGivenData.push(options);
  allGivenData.push(newQ);
  allGivenData.push(responseObj);
  return res.json(allGivenData);
  
});


app.get('/savedQuestion', (req, res)=>{
  Saved_Questions.findAll({}).then(savedQuestionsBad=>{
    let savedQuestions = []
    savedQuestionsBad.map((result) => {
      savedQuestions.push(result.toJSON())
    });
    console.log(savedQuestions);
    
    // let sumOfAvgVotes = 0;
    // savedQuestions.map(question=>sumOfAvgVotes = sumOfAvgVotes + question.avg_rate);
    let pickAQuestion = []
    for (const question of savedQuestions){
      for(let i = 1 ; i <= question.avg_rate ; i++){
        pickAQuestion.push(question);
      }
    }
    let responseObj = {}
    let pickedQuestion = pickAQuestion[random(0,pickAQuestion.length)];
    
    responseObj.question = pickedQuestion.question
    responseObj.questionID = pickedQuestion.id
    responseObj.option1 = pickedQuestion.option_1
    responseObj.option2 = pickedQuestion.option_2
    responseObj.option3 = pickedQuestion.option_3 || null
    responseObj.option4 = pickedQuestion.option_4 || null
    res.json(responseObj);
  })
})

// {question: "test",
// answer :"45",
// option_1: "44",
// option_2:"44",
// option_3:"44",
// option_4:"44",
// tamplate_id: 8,
// question_type: 3,
// avg_rate: 4,
// total_rating: 4,
// total_votes: 1
// }
app.post('/savedQuestion', (req, res) =>{
  const data = req.body;
  console.log(data , "this is data")
  Saved_Questions.create(data,
    {fields:["question", "answer", "option_1","option_2","option_3","option_4","tamplate_id","question_type","avg_rate","total_rating","total_votes",]
  }).then((result)=>{
    return res.json(result)
  })
 
});


app.listen(3000, () => {
  console.log("listening on port 3000");
});
