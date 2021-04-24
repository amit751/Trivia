import React, { useRef, useEffect, useState, useMemo, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";

import axios from "axios";
export default function WelcomePage() {
  const input = useRef();
  return (
    <div>
      <input ref={input} id="player-name" type="text"></input>
      <Link className="link" to="/Game">
        <button
          onClick={() => {
            alert(input.current.value);
          }}
        >
          START GAME
        </button>
      </Link>
    </div>
  );
}
