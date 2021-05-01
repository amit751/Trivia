import React, { useRef, useState } from "react";
import axios from "axios";

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
  const handleClick = () => {
    axios
      .post("http://localhost:3000/users/login", {
        /////////////////////////axios
        username: usernameInput.current.value,
        password: passwordInput.current.value,
      })
      .then(({ data }) => {
        console.log("here");
        console.log(data);

        Cookies.set("refreshToken", data.refreshToken);
        Cookies.set("accessToken", data.accessToken);

        Network("http://localhost:3000/permition", "GET")
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
    <div>
      <div>
        <button onClick={logOut}>logout</button>
      </div>
      <label>
        username:
        <input
          required
          name="usernameInput"
          onChange={handleInputChange}
          ref={usernameInput}
        />
      </label>
      <br />
      <label>
        password:
        <input
          required
          name="passwordInput"
          type="password"
          onChange={handleInputChange}
          ref={passwordInput}
        />
      </label>
      <button onClick={handleClick}>submit</button>
      <div>{message}</div>
    </div>
  );
}
