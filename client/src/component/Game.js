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
  const rateRef = useRef();

  useEffect(() => {
    if (mistakeCounter === 3) {
      history.push("/");
    }
  }, [mistakeCounter]);

  useEffect(async () => {
    console.log("did mount");
    const { data } = await axios.get("http://localhost:3000/newQuestion");
    setCurrentQuestion(data);
    console.log(data, " -------> DATA");
  }, []);

  const getOptions = (currentQuestion) => {
    console.log(currentQuestion);
    let options = [];
    console.log(currentQuestion.question_type);
    if (currentQuestion.question_type < 3) {
      for (let i = 0; i < 4; i++) {
        options.push(currentQuestion[`option_${i + 1}`]);
        // console.log(
        //   currentQuestion[`option_${i + 1}` + " ----> option for loop"]
        // );
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
      if (rateRef.current.value) {
        await axios.post(
          `http://localhost:3000/rate/${currentQuestion.savedQuestionID}`,
          {
            rate: rateRef.current.value,
          }
        );
      }
      console.log("in firs if");
      const { data } = await axios.get(
        `http://localhost:3000/savedAnswer/${currentQuestion.savedQuestionID}` ////
      );
      dbAnswer = data.answer;
      askedSavedQuestion.push(data.id);
      console.log("db answer", dbAnswer, "useranswer", userAnswer);
    } else {
      if (rateRef.current.value) {
        console.log("inside", rateRef.current.value);
        const { data } = await axios.post(
          "http://localhost:3000/savedQuestion",
          currentQuestion
        );
        console.log(data, "hi", data.id);
        askedSavedQuestion.push(data.id);
        await axios.post(`http://localhost:3000/rate/${data.id}`, {
          rate: Number(rateRef.current.value),
        });
      }
      const { data } = await axios.post(
        "http://localhost:3000/getNewAnswer",
        currentQuestion
      );

      dbAnswer = data.answer;
      console.log("db answer", dbAnswer, "useranswer", userAnswer);
    }
    if (dbAnswer === userAnswer) {
      setQuestionScore(100);
      setTotalScore((totalScore) => totalScore + 100);
    } else {
      setQuestionScore(0);
      setMistakeCounter((mistakeCounter) => ++mistakeCounter);
    }

    const { data } = await axios.get("http://localhost:3000/newQuestion");
    console.log(data);
    setCurrentQuestion(data);
  };

  return (
    <div>
      game
      <h1>שאלה</h1>
      <select onChange={() => {}} ref={rateRef} name="rate">
        <option value={null}></option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      <div>{currentQuestion.question}</div>
      <div id="options-container">
        {getOptions(currentQuestion).map((option) => {
          return (
            <div
              onClick={() => {
                setUserAnswer(option);
              }}
            >
              {option}
            </div>
          );
        })}
      </div>
      <button id="send-button" onClick={next}>
        send
      </button>
      <div>your choise: {userAnswer}</div>
      <PlayerScore questionScore={questionScore} totalScore={totalScore} />
    </div>
  );
}
