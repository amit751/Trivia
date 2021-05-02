import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "../style/Welcome.css";

export default function WelcomePage({ setPlayerName }) {
  const input = useRef();
  return (
    <>
      <h1 className="headline">Trivia Around The World</h1>
      <div id="welcome-component">
        <Link id="table-link" to="/TableScore">
          Table score
        </Link>
        <div id="input details">
          <span id="name">name:</span>
          <input ref={input} id="player-name" type="text"></input>
        </div>
        <Link id="game-link" className="link" to="/Game">
          <button
            onClick={() => {
              setPlayerName(input.current.value);
            }}
          >
            START GAME
          </button>
        </Link>
      </div>
    </>
  );
}
