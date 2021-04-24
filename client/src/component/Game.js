import React, { useRef, useEffect, useState, useMemo, useContext } from "react";
import axios from "axios";
export default function Game() {
  const askedSavedQuestion = [];
  const [currentQustion, setCurrentQuestion] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });
  const [currentAnswer, setCurrentAnswer] = useState("");

  useEffect(async () => {
    console.log("did mount");
    const { data } = await axios.get("http://localhost:3000/newQuestion");
    console.log(data);
    setCurrentQuestion(data);
  }, []);

  const getOptions = (currentQustion) => {
    let options = [];
    if (currentQustion.type < 3) {
      for (let i = 0; i < 4; i++) {
        options.push(currentQustion[`option${i + 1}`]);
      }
    } else {
      options = ["true", "false"];
    }
    return options;
  };

  const next = async (answer, currentQustion) => {
    const dbAnswer = "";
    if (currentQustion.savedQuestions) {
      const { data } = await axios.get(
        `http://localhost:3000/savedAnswer/${currentQustion.savedQuestionID}`
      );
      dbAnswer = data.answer;
      askedSavedQuestion.push(data.id);
    } else {
      const { data } = await axios.post(
        `http://localhost:3000"/getNewAnswer`,
        {}
      );
    }
  };

  return (
    <div>
      game
      <h1>שאלה</h1>
      <div>{currentQustion.question}</div>
      <div id="options-container">
        {getOptions(currentQustion).map((option) => {
          return (
            <div
              onClick={() => {
                setCurrentAnswer(option);
                console.log(option);
                console.log(currentAnswer);
              }}
            >
              {option}
            </div>
          );
        })}
      </div>
      <button id="send-button">send</button>
    </div>
  );
}
