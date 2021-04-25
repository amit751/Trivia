import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import "../style/TableScore.css";

export default function TableScore({ history, playerName }) {
  console.log(playerName);
  const [tableScore, setTableScore] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/players").then(({ data }) => {
      setTableScore(data.map((result) => result));
    });
  }, []);
  return (
    <div id="table-component">
      <h1>table score</h1>
      <div id="table-container">
        <table id="table">
          <tr>
            <th>Player</th>
            <th>Score</th>
            <th>Rank</th>
          </tr>
          {tableScore.map((player, index) =>
            player.name === playerName ? (
              <tr style={{ backgroundColor: `yellow` }}>
                <td>{player.name}</td>
                <td>{player.score}</td>
                <td>{index + 1}</td>
              </tr>
            ) : (
              <tr>
                <td>{player.name}</td>
                <td>{player.score}</td>
                <td>{index + 1}</td>
              </tr>
            )
          )}
        </table>
      </div>
      <div id="link-container">
        <Link to="/">
          <div className="link">start game</div>
        </Link>
      </div>
    </div>
  );
}
