
import React, { useRef, useState, } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function SingUp() {
    const usernameInput = useRef("")
    const emailInput = useRef("")
    const passwordInput = useRef("")
    let allInputs = { usernameInput, emailInput, passwordInput };
    const [message, setMessage] = useState("")
    const handleInputChange = (event) => {
        console.log(event.target.value, event.target.name);
        const value = event.target.value;
        const name = event.target.name;
        allInputs[name].current.value = value
    }
    const handleClick = () => {
        console.log("posttttttttttt");
        axios.post("http://localhost:3000/users/register", { /////////////////////////
            username: usernameInput.current.value,
            email: emailInput.current.value,
            password: passwordInput.current.value
        }).then(({ data }) => {
            console.log("here");
            console.log(data);
            for (const input in allInputs) {
                allInputs[input].current.value = ""
            }
            setMessage(data);
        }).catch(e => console.log(e));
    }
    return (
        <div>

            <label>
                username:
          <input required name="usernameInput" onChange={handleInputChange} ref={usernameInput} />
            </label>
            <br />
            <label>
                eMail:
          <input required name="emailInput" type="email" onChange={handleInputChange} ref={emailInput} />
            </label>
            <label>
                password:
          <input required name="passwordInput" type="password" onChange={handleInputChange} ref={passwordInput} />
            </label>
            <button onClick={handleClick}>
                submit
                </button >
            <div>{message}</div>
            <Link id="login-link" to="/login">
                logIn
            </Link>
        </div>
    )
}
