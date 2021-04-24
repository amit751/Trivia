import "./App.css";
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import Home from "./components/Home";
import { useState } from "react";
import axios from "axios";

function App() {
  const [playerName, setPlayerName] = useState("");
  const handleChange = (e) => {
    setPlayerName(e.target.value);
  };
  const handleSubmit = () => {
    axios.post("http");
  };
  return (
    <div>
      <h1>HEllo</h1>
      <h2>{playerName}</h2>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={Home}
            playerName={playerName}
            setPlayerName={setPlayerName}
            handleSubmit={handleSubmit}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
