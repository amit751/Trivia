import React, { useRef, useEffect, useState, useMemo, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom"
export default function Login() {
    const usernameInput = useRef("")
    const passwordInput = useRef("")
    const [message, setMessage] = useState("")
    const history = useHistory()
    let allInputs = { usernameInput, passwordInput };

    const handleInputChange = (event) => {

        const value = event.target.value;
        const name = event.target.name;

        allInputs[name].current.value = value
    }

    const handleClick = () => {
        console.log("posttttttttttt");
        axios.post("http://localhost:3000/users/login", {
            username: usernameInput.current.value,
            password: passwordInput.current.value
        }).then(({ data }) => {
            console.log("here");
            console.log(data);
            for (const input in allInputs) {
                allInputs[input].current.value = ""
            }
            Cookies.set("refreshToken", data.refreshToken);
            Cookies.set("accessToken", data.accessToken);
            // if(data.refreshToken )
            // history.push("/Game");


            // setMessage(data);
        })
            .catch((e) => {
                console.log(e.response.data);
                console.log(e);
                setMessage(e.response.data);
            });
    }
    return (
        <div>

            <label>
                username:
      <input required name="usernameInput" onChange={handleInputChange} ref={usernameInput} />
            </label>
            <br />
            <label>
                password:
      <input required name="passwordInput" type="password" onChange={handleInputChange} ref={passwordInput} />
            </label>
            <button onClick={handleClick}>
                submit
            </button >
            <div>{message}</div>

        </div>
    )
}
