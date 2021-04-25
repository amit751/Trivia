import WelcomePage from "./component/WelcomePage";
import React, { useRef, useEffect, useState, useMemo, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";

import Game from "./component/Game";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/Game" exact component={Game} />
          <Route path="/" exact component={WelcomePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

// <Route
//                   path='/game'
//                   render={(props) => (
//                     <Game {...props} playerName={playerName} />
//                   )}
//                 />
