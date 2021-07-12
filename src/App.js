import { useState } from 'react';
import './components/Keyboard/Keyboard.css'
import { ScoreContext } from './context/scoreContext';
import RetryMenu from './pages/RetryMenu';
import SaveScorePage from './pages/SaveScorePage';
import { Switch, Route, Redirect } from "react-router-dom";
import HighScores from './pages/HighScores'
import Game from './pages/Game';

function App() {

    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [isActive, setActive] = useState(true);

    return (
        <div className="app">
          <ScoreContext.Provider value={{score, setScore, level, setLevel, isActive, setActive }}>
          <Switch>
            <Route path="/high-scores">
                <HighScores/>
            </Route>
            <Route path="/save-score">
                {score !== 0 ? <SaveScorePage/>: <Redirect to="/"/>}
            </Route>
            <Route exact path="/">
                {isActive ? <Game/> : <RetryMenu />}
            </Route>
                
           </Switch>
          </ScoreContext.Provider>
        </div>
      );
}

export default App;

