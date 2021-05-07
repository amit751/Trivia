import React, { useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../style/SignUp.css";

export default function SingUp() {
  const usernameInput = useRef("");
  const emailInput = useRef("");
  const passwordInput = useRef("");
  let allInputs = { usernameInput, emailInput, passwordInput };
  const [message, setMessage] = useState("");
  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    allInputs[name].current.value = value;
  };
  const handleClick = () => {
    console.log("in handleClick");
    axios
      .post("https://hallowed-key-312708.ew.r.appspot.com/users/register", {
        /////////////////////////
        username: usernameInput.current.value,
        email: emailInput.current.value,
        password: passwordInput.current.value,
      })
      .then(({ data }) => {
        console.log(data);
        for (const input in allInputs) {
          allInputs[input].current.value = "";
        }
        setMessage(data);
      })
      .catch((e) => {
        for (const input in allInputs) {
          allInputs[input].current.value = "";
        }
        setMessage(e.response.data);
        console.log(e, e.response);
      });
  };
  return (
    <div className="signup-component">
      <div className="register-box">
        <label>
          <input
            placeholder="username"
            required
            name="usernameInput"
            onChange={handleInputChange}
            ref={usernameInput}
            type="text"
          />
        </label>

        <label>
          <input
            placeholder="Email"
            required
            name="emailInput"
            type="email"
            onChange={handleInputChange}
            ref={emailInput}
          />
        </label>
        <label>
          <input
            placeholder="password"
            required
            name="passwordInput"
            type="password"
            onChange={handleInputChange}
            ref={passwordInput}
          />
        </label>
        <button className="submit-button" onClick={handleClick}>
          submit
        </button>
        <div>{message}</div>
        <Link id="login-link" to="/login">
          logIn
        </Link>
      </div>
    </div>
  );
}
