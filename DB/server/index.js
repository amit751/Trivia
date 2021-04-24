
//imports

const express = require("express");
const app = express();
const {Saved_Questions,All_Data,Questions,Players, sequelize} = require("../models");
const { Op, literal , Sequelize } = require("sequelize");
app.use(express.json());
const {getAnswer} = require("../utils/functions");

//functions
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

function getCountryFromData(column, numberOfOptions , questionID) {
  if(questionID === 13){
    console.log("in 13");
    return All_Data.findOne({
      attributes:  [column , "country"],
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
//GET: /newQ => generate a new q ================
// get: /savedQ => send a saved one ===============
// post: /savedQ => post question ================
// patch: /rate/id => rate a q ==================
// get: /player=>
// post: /player => score and player name after game round=================
//post : get answer:



app.post("/players", async(req,res)=>{
 const data = req.body;
 const result = await Players.create(data,
  {fields:["name" , "score" ]});
  res.json(result);
})
app.get("/players" , async(req,res)=>{
  const players = await Players.findAll({});
  res.json(players);

})

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
    });
    
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
        responseObj.XXX=options.country;
      }else{
        responseObj.question = newQ.tamplate.replace('XXX', options[0].country);
        options.map((option , index)=>{
          responseObj[`option${index+1}`] = option[newQ.table_column]
        })
        responseObj.XXX=options[0].country;
      }
      
      break;
    case 3:
      responseObj.question = newQ.tamplate.replace('XXX',options[0].country).replace('YYY',options[1].country);
      responseObj.XXX=options[0].country;
      responseObj.YYY=options[1].country;
      
      
      break;

  }
  responseObj.type = newQ.type;
  responseObj.tamplateId = newQ.id; 
  responseObj["savedQuestions"] = false;
  responseObj.column = newQ.table_column; 
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
    
    let pickAQuestion = []
    for (const question of savedQuestions){
      for(let i = 1 ; i <= question.avg_rate ; i++){
        pickAQuestion.push(question);
      }
    }
    let responseObj = {}
    let pickedQuestion = pickAQuestion[random(0,pickAQuestion.length)];
    
    responseObj.question = pickedQuestion.question
    responseObj.savedQuestionID = pickedQuestion.id
    responseObj.option1 = pickedQuestion.option_1
    responseObj.option2 = pickedQuestion.option_2
    responseObj.option3 = pickedQuestion.option_3 || null
    responseObj.option4 = pickedQuestion.option_4 || null
    responseObj.type = pickedQuestion.question_type;
    responseObj.tamplateId = pickedQuestion.tamplate_id;
    responseObj["savedQuestions"] = true; 
    
    res.json(responseObj);
  });
});

// {
  "xxx"
  "yyy"
  "column"
// "question
//  "answer
// "option_1
// "option_2
// "option_3
// "option_4
// "tamplate_id
// "question_type
// "avg_rate
// "total_rating
// "total_votes"
// }
app.post('/savedQuestion', async(req, res) =>{
  const data = req.body;
  console.log(data , "this is data")
  if( data.tamplate_id<=10){
    const {column, question_type , tamplate_id , option_1 ,option_2 ,option_3 ,option_4} = data;
    const optionsArr = await  All_Data.findAll({
      where: {
        country: { [Op.or]: [option_1 ,option_2 ,option_3 ,option_4] },
      },
      attributes: [ column , "country"],
      
    });
    const finalOption = optionsArr.reduce((previousLargestNumber, currentLargestNumber)=> {
      if(data.tamplate_id === 2||data.tamplate_id === 4||data.tamplate_id === 6){
        return (currentLargestNumber[ column] < previousLargestNumber[ column]) ? currentLargestNumber : previousLargestNumber;
      }else{
        return (currentLargestNumber[ column] > previousLargestNumber[ column]) ? currentLargestNumber : previousLargestNumber;
      }
    });
    data.answer = finalOption["country"];

  
  
  }else if(11<=data.tamplate_id && data.tamplate_id<=13){
    const {column, question_type , tamplate_id , option_1 ,option_2 ,option_3 ,option_4 , XXX} = data;
    const answer = await  All_Data.findOne({
      where: {
        country: XXX,
      },
      attributes: [column],
    });
    data.answer = answer[column];
  
  }else if(14<=data.tamplate_id && data.tamplate_id<=20){
    const {column, question_type , tamplate_id , YYY , XXX} = data;
    const options = await  All_Data.findAll({
      where: {
        country: { [Op.or]: [XXX , YYY] },
      },
      attributes: [column , "country"],
    });
    const answer = options.reduce((previousLargestNumber, currentLargestNumber)=>{
      return (currentLargestNumber[ column] > previousLargestNumber[ column]) ? currentLargestNumber : previousLargestNumber;
    });
    if( answer.country === XXX){
      data.answer = "true";
    }else{
      data.answer = "false";
    }
  }

  Saved_Questions.create(data,
    {fields:["question", "answer", "option_1","option_2","option_3","option_4","tamplate_id","question_type","avg_rate","total_rating","total_votes",]
  }).then((result)=>{
    return res.json(result)
  })
 
});

app.post("/rate/:id" , async (req , res)=>{
  const data = req.body;
  const{ id} = req.params;
  const question= await Saved_Questions.findOne({
    where:{
      id : id
    }
  });
  const {avg_rate , total_rating , total_votes  } = question;
  question["total_rating"]= total_rating + data.rate;
  question["total_votes"]= total_votes+1;
  question["avg_rate"]= (total_rating + data.rate)/(total_votes+1);
  const result = await question.save();


  res.json(result);
  
})

app.get("/savedAnswer/:id" , async (req,res)=>{
  const questionId = req.params.id;
  const answer = await Saved_Questions.findOne({
    where:{
      id : questionId
    },
    attributes:["answer"]
  });
  res.json(answer);

});
app.post("/newAnswer" , (req,res)=>{

})

app.listen(3000, () => {
  console.log("listening on port 3000");
});
