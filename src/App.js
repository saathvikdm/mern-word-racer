import { useState } from 'react';
import './components/Keyboard/Keyboard.css'
import Keyboard from "./components/Keyboard/Keyboard";
import WordStack from './components/WordStack/WordStack';
import Score from './components/Score/Score';
import { ScoreContext } from './context/scoreContext';
import RetryMenu from './pages/RetryMenu';
import SaveScorePage from './pages/SaveScorePage';
import { Switch, Route, Redirect } from "react-router-dom";
import HighScores from './pages/HighScores'

function App() {

    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [isActive, setActive] = useState(true);
    const [wordStack, setWordStack] = useState([
        "hello",
        "heat",
        "bye",
        "corona",
        "health",
        "happy",
        "good",
        "great"
    ]);

    return (
        <div className="app">
          <ScoreContext.Provider value={{score, setScore, level, setLevel, isActive, setActive, wordStack, setWordStack }}>
          <Switch>
            <Route path="/high-scores">
                <HighScores/>
            </Route>
            <Route path="/save-score">
                <SaveScorePage/>
            </Route>
            <Route exact path="/">
                {isActive ? 
                    <>
                <Score/>
                <WordStack/>
                <Keyboard/>
                </> :
                <RetryMenu />
                }
            </Route>
                
           </Switch>
          </ScoreContext.Provider>
        </div>
      );
}

export default App;

