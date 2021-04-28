import React, { useRef, useEffect, useState, useMemo, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import WelcomePage from "./component/welcomePage";
import Game from "./component/Game";
import TableScore from "./component/TableScore";

function App() {
  const [playerName, setPlayerName] = useState();
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/Game"
            render={(props) => <Game {...props} playerName={playerName} />}
          />
          <Route
            path="/"
            exact
            render={(props) => (
              <WelcomePage {...props} setPlayerName={setPlayerName} />
            )}
          />
          <Route
            path="/TableScore"
            exact
            render={(props) => (
              <TableScore {...props} playerName={playerName} />
            )}
          />
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
