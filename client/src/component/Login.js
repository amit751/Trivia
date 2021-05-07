import React, { useRef, useState } from "react";
import axios from "axios";
import "../style/LoginSass/Login.css";

import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import Network from "../networkWarper";

export default function Login({ setPlayerName }) {
  const usernameInput = useRef("");
  const passwordInput = useRef("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  let allInputs = { usernameInput, passwordInput };

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    allInputs[name].current.value = value;
  };

  const handleClick = () => {
    axios
      .post("https://hallowed-key-312708.ew.r.appspot.com/users/login", {
        /////////////////////////axios
        username: usernameInput.current.value,
        password: passwordInput.current.value,
      })
      .then(({ data }) => {
        console.log("here");
        console.log(data);

        Cookies.set("refreshToken", data.refreshToken);
        Cookies.set("accessToken", data.accessToken);

        Network("https://hallowed-key-312708.ew.r.appspot.com/permition", "GET")
          .then((result) => {
            console.log(usernameInput.current.value, "yyyyyyyyyyy");
            setPlayerName(usernameInput.current.value);
            if (result) history.push("/game");
          })
          .catch((e) => {
            console.log(e);
            alert("you are unouthorized");
            history.push("/");
          });
      })
      .catch((e) => {
        for (const input in allInputs) {
          allInputs[input].current.value = "";
        }
        console.log(e.response.data);
        setMessage(e.response.data);
      });
  };
  return (
    <div id="login-component">
      <div className="login-box">
        <label>
          <input
            required
            name="usernameInput"
            onChange={handleInputChange}
            ref={usernameInput}
            className="login-input"
            placeholder="username"
            type="text"
          />
        </label>
        <br />
        <label>
          <input
            required
            name="passwordInput"
            type="password"
            onChange={handleInputChange}
            ref={passwordInput}
            className="login-input"
            placeholder="password"
          />
        </label>
        <button className="login-button" onClick={handleClick}>
          Login
        </button>
        <div>{message}</div>
      </div>
      <div class="bubbles">
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
      </div>
    </div>
  );
}
