import React from 'react'
import { Play } from '../Buttons/Buttons';
import "./Instructions.css"
export default function Instructions(props) {

    const setInit = props.setInit;

    const handleSetInit = () => {
        return setInit(true);
    }

    return (
        <div className="instructions-container">
            <h1 className="instructions-header">MERN Word Racer</h1>
            <h3>Instructions to play the game</h3>
            <ul className="instructions-list">
                <li>Words will appear upon starting the game</li>
                <li>Focus on the left most word in the stack and start typing the word</li>
                <li>Words will appear one by one with initial stack size of 4</li>
                <li>Words will appear faster as you score and level up</li>
                <li>Once the stack reaches 7 words, the game is over</li>
            </ul>
            <Play handlePlay={handleSetInit}>Start</Play>
        </div >
    )
}
