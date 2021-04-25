import React, { useRef, useEffect, useState, useMemo, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import "../style/Welcome.css";

export default function WelcomePage({ setPlayerName }) {
  const input = useRef();
  return (
    <>
      <h1 className="headline">trivia around the world</h1>
      <div id="welcome-component">
        <Link id="table-link" to="/TableScore">
          Table score
        </Link>
        <span id="name">name:</span>
        <input ref={input} id="player-name" type="text"></input>
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
