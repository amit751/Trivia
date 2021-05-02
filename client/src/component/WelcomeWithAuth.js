import React from "react";
import { Link } from "react-router-dom";
export default function WelcomeWithAuth() {
  return (
    <div>
      <h1 className="headline">Trivia Around The World</h1>
      <div id="welcome-with-auth-component">
        <Link id="login-link" to="/login">
          Log in
        </Link>
      </div>
      <div>
        <Link id="singup-link" to="/singup">
          Sign up
        </Link>
      </div>
    </div>
  );
}
