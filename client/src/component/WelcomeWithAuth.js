import React from "react";
import { Link } from "react-router-dom";
import "../style/Welcome.css";

export default function WelcomeWithAuth() {
  return (
    <div id="welcome-component">
      <h1 className="headline">
        <span className="T">T</span>
        rivia <span className="A-and-W">A</span>
        round <span className="T">T</span>he <span className="A-and-W">W</span>
        orld
      </h1>
      <div id="welcome-with-auth-component">
        <Link id="login-link" to="/login">
          Log in
        </Link>

        <Link id="singup-link" to="/singup">
          Sign up
        </Link>
      </div>
      <div class="bg"></div>
      <div class="bg bg2"></div>
      <div class="bg bg3"></div>
    </div>
  );
}
