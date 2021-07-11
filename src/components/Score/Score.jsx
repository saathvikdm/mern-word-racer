import React, { useContext } from 'react'
import { ScoreContext } from '../../context/scoreContext';
import './Score.css'


export default function Score(props) {

    const { score, level } = useContext(ScoreContext);

    return (
        <div className="score--box">
            <h1>Score: {score}</h1>
            <h1>Level: {level}</h1>
        </div>
    )
}
