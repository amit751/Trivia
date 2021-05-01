import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../style/TableScore.css";
import Network from "../networkWarper";
import Cookies from "js-cookie";

export default function TableScore({ history, playerName }) {
  const [tableScore, setTableScore] = useState([]);
  useEffect(() => {
    Network("http://localhost:3000/players", "GET")
      .then((data) => {
        setTableScore(data.map((result) => result));
      })
      .catch((e) => {
        console.log(e);
        alert("you are unauthorized");
        history.push("/");
      });
  }, []);

  const logOut = () => {
    Network("http://localhost:3000/users/logout", "POST")
      .then((result) => {
        console.log(result);
      })
      .catch((e) => {
        console.log(e);
      });
    Cookies.remove("refreshToken");
    Cookies.remove("accessToken");
    history.push("/");
  };

  return (
    <div id="table-component">
      <button onClick={logOut}>logout</button>
      <h1>table score</h1>
      <div id="link-container">
        <Link to="/">
          <div className="link">start game</div>
        </Link>
      </div>
      <div id="table-container">
        <table id="table">
          <tr>
            <th>Player</th>
            <th>Score</th>
            <th>Rank</th>
          </tr>
          {tableScore.map((player, index) =>
            player.name === playerName ? (
              <tr className="current-player-tr">
                <td className="current-player-tr">{player.name}</td>
                <td className="current-player-tr">{player.score}</td>
                <td className="current-player-tr">{index + 1}</td>
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
    </div>
  );
}
