import React from "react";

export default function PlayerScore({ questionScore, totalScore }) {
  const text = questionScore === 0 ? "wrong" : "right";
  return (
    <div id="display-score">
      <div>
        you {text} got {questionScore} on this question
      </div>
      <div>total score {totalScore}</div>
    </div>
  );
}
