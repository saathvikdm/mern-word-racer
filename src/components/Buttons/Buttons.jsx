import React, { useContext } from 'react'
import { ScoreContext } from '../../context/scoreContext';
import './Buttons.css'

function Play(props) {

    const handlePlay = props.handlePlay;

    return (
        <button className="game-button" onClick={handlePlay}>Start</button>
    )
}


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

function SaveButton(props) {
    return (<button className="game-button green">Save Score</button>)
}

function SaveScore(props) {
    const handleSave = props.handleSave;
    const saved = props.saved;
    return (
        <button className="game-button green" onClick={handleSave}>{saved === 0 ? "Save Score" : saved === 1 ? "Saving..." : "Success"}</button>
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

export { Play, PlayButtons, SaveButton, SaveScore, HighScores, GoBack };
