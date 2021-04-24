import React, { useRef, useEffect, useState, useMemo, useContext } from "react";
import axios from "axios";
import PlayerScore from "./PlayerScore";

export default function Game({ history }) {
  const askedSavedQuestion = [];
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    option_1: "",
    option_2: "",
    option_3: "",
    option_4: "",
  });
  const [userAnswer, setUserAnswer] = useState("");
  const [questionScore, setQuestionScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [mistakeCounter, setMistakeCounter] = useState(0);
  useEffect(() => {
    if (mistakeCounter === 3) {
      history.push("/");
    }
  }, [mistakeCounter]);

  useEffect(async () => {
    console.log("did mount");
    const { data } = await axios.get("http://localhost:3000/newQuestion");
    setCurrentQuestion(data);
    console.log(JSON.parse(data) + " -------> DATA");
  }, []);

  const getOptions = (currentQuestion) => {
    console.log(currentQuestion);
    let options = [];
    if (currentQuestion.question_type < 3) {
      for (let i = 0; i < 4; i++) {
        options.push(currentQuestion[`option_${i + 1}`]);
        console.log(
          currentQuestion[`option_${i + 1}` + " ----> option for loop"]
        );
      }
    } else if (currentQuestion.question_type === 3) {
      console.log("in type 3");
      options = ["true", "false"];
    }
    console.log(options + "  ---> options");
    return options;
  };

  const next = async () => {
    console.log("inside next", currentQuestion);
    let dbAnswer = "";
    if (currentQuestion.savedQuestions) {
      console.log("in firs if");
      const { data } = await axios.get(
        `http://localhost:3000/savedAnswer/${currentQuestion.savedQuestion}`
      );
      dbAnswer = data.answer;
      askedSavedQuestion.push(data.id);
      console.log("db answer", dbAnswer, "useranswer", userAnswer);
    } else {
      console.log("in first else");
      //   axios
      //     .post("http://localhost:3000/getNewAnswer", currentQuestion)
      //     .then((result) => {
      //       console.log(result);
      //       dbAnswer = result.answer;
      //     })
      //     .catch((e) => {
      //       console.log(e);
      //     });

      const { data } = await axios.post(
        "http://localhost:3000/getNewAnswer",
        currentQuestion
      );
      console.log(3333333333333333);
      dbAnswer = data.answer;
      console.log("db answer", dbAnswer, "useranswer", userAnswer);
    }
    if (dbAnswer === userAnswer) {
      setQuestionScore(100);
      setTotalScore(totalScore + 100);
      console.log("65");
    } else {
      setQuestionScore(0);
      setMistakeCounter((mistakeCounter) => ++mistakeCounter);
      console.log("68");
    }
    console.log("come here");
    const { data } = await axios.get("http://localhost:3000/newQuestion");
    console.log(data);
    setCurrentQuestion(data);
    console.log("come here");
  };

  return (
    <div>
      game
      <h1>שאלה</h1>
      <div>{currentQuestion.question}</div>
      <div id="options-container">
        {/* {getOptions(currentQuestion).map((option) => {
          return (
            <div
              onClick={() => {
                setUserAnswer(option);
                console.log(option);
                console.log(userAnswer);
              }}
            >
              {option}
            </div>
          );
        })} */}
      </div>
      <button id="send-button" onClick={next}>
        send
      </button>
      <div>your choise: {userAnswer}</div>
      <PlayerScore questionScore={questionScore} totalScore={totalScore} />
    </div>
  );
}
