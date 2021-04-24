
  const {Saved_Questions,All_Data,Questions,Players, sequelize} = require("../models");
  const { Op, literal , Sequelize } = require("sequelize");
  
 async function getAnswer (data){
   console.log("inside get answer");
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
        console.log(" answerr type 1",finalOption["country"]);
        return finalOption["country"];
        //data.answer = finalOption["country"];
    
      
      
      }else if(11<=data.tamplate_id && data.tamplate_id<=13){
        const {column,  XXX} = data;
        const answer = await  All_Data.findOne({
          where: {
            country: XXX,
          },
          attributes: [column],
        });
        //data.answer = answer[column];
        console.log(" answerr type 2",answer[column]);
        return answer[column];
      
      }else if(14<=data.tamplate_id && data.tamplate_id<=20){
        let finalAnswer = "";
        const {column , YYY , XXX} = data;
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
            finalAnswer = "true";
        }else{
         finalAnswer = "false";
        }
        console.log(" answerr type 3",finalAnswer);
        return finalAnswer;
        
      }

  }
  

  module.exports = {getAnswer}


  // if( data.tamplate_id<=10){
  //   const {column, question_type , tamplate_id , option_1 ,option_2 ,option_3 ,option_4} = data;
  //   const optionsArr = await  All_Data.findAll({
  //     where: {
  //       country: { [Op.or]: [option_1 ,option_2 ,option_3 ,option_4] },
  //     },
  //     attributes: [ column , "country"],
      
  //   });
  //   const finalOption = optionsArr.reduce((previousLargestNumber, currentLargestNumber)=> {
  //     if(data.tamplate_id === 2||data.tamplate_id === 4||data.tamplate_id === 6){
  //       return (currentLargestNumber[ column] < previousLargestNumber[ column]) ? currentLargestNumber : previousLargestNumber;
  //     }else{
  //       return (currentLargestNumber[ column] > previousLargestNumber[ column]) ? currentLargestNumber : previousLargestNumber;
  //     }
  //   });
  //   data.answer = finalOption["country"];

  
  
  // }else if(11<=data.tamplate_id && data.tamplate_id<=13){
  //   const {column, question_type , tamplate_id , option_1 ,option_2 ,option_3 ,option_4 , XXX} = data;
  //   const answer = await  All_Data.findOne({
  //     where: {
  //       country: XXX,
  //     },
  //     attributes: [column],
  //   });
  //   data.answer = answer[column];
  
  // }else if(14<=data.tamplate_id && data.tamplate_id<=20){
  //   const {column, question_type , tamplate_id , YYY , XXX} = data;
  //   const options = await  All_Data.findAll({
  //     where: {
  //       country: { [Op.or]: [XXX , YYY] },
  //     },
  //     attributes: [column , "country"],
  //   });
  //   const answer = options.reduce((previousLargestNumber, currentLargestNumber)=>{
  //     return (currentLargestNumber[ column] > previousLargestNumber[ column]) ? currentLargestNumber : previousLargestNumber;
  //   });
  //   if( answer.country === XXX){
  //     data.answer = "true";
  //   }else{
  //     data.answer = "false";
  //   }
  // }