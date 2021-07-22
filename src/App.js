import { useState } from "react";
import "./components/Keyboard/Keyboard.css";
import { ScoreContext } from "./context/scoreContext";
import RetryMenu from "./pages/RetryMenu";
import SaveScorePage from "./pages/SaveScorePage";
import { Switch, Route, Redirect } from "react-router-dom";
import HighScores from "./pages/HighScores";
import Game from "./pages/Game";
import Instructions from "./components/Instructions/Instructions";

function App() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [isActive, setActive] = useState(true);
  const [start, setStart] = useState(false);
  const [multiplier, setMultiplier] = useState(1);
  const [saved, setSaved] = useState(0);
  const [username, setUsername] = useState(null);

  return (
    <div className="app">
      <ScoreContext.Provider
        value={{
          score,
          setScore,
          level,
          setLevel,
          isActive,
          setActive,
          multiplier,
          setMultiplier,
          saved,
          setSaved,
          username,
          setUsername,
        }}
      >
        <Switch>
          <Route path="/high-scores">
            <HighScores />
          </Route>
          <Route path="/save-score">
            {score !== 0 ? <SaveScorePage /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/">
            {start ? (
              isActive ? (
                <Game />
              ) : (
                <RetryMenu />
              )
            ) : (
              <Instructions setInit={setStart} />
            )}
          </Route>
        </Switch>
      </ScoreContext.Provider>
    </div>
  );
}

export default App;
