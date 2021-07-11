import React, { useContext } from 'react'
import { ScoreContext } from '../../context/scoreContext';
import './Buttons.css'


function PlayButtons(props) {

    const reset = props.reset;

    const { setScore, setLevel } = useContext(ScoreContext);

    function handlePlayButton() {
        setScore(0);
        setLevel(1);
        reset();
    }

    return (
        <button className="game-button" onClick={handlePlayButton}>Play Again</button>

    )
}

function SaveScore(props) {
    const handleSave = props.handleSave;
    return (
        <button className="game-button green" onClick={handleSave}>Save Score</button>
    )
}

function HighScores(props) {
    return (
        <button className="game-button orange" >High Scores</button>
    )
}

function GoBack(props) {
    return (
        <button className="game-button red" >Go Back</button>
    )
}

export { PlayButtons, SaveScore, HighScores, GoBack };
