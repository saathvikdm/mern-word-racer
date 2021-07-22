import React, { useContext, useEffect, useState } from 'react'
import { ScoreContext } from '../context/scoreContext'
import { PlayButtons, HighScores } from '../components/Buttons/Buttons'
import './MenuStyles.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function RetryMenu(props) {
    const { setActive, score, level, setSaved } = useContext(ScoreContext);

    const username = props.username;

    const [position, setPosition] = useState(null);

    function resetGame() {
        setActive(true);
        setSaved(0);
    }

    useEffect(() => {
        getPosition();
    })

    async function getPosition() {
        const {data} = await axios.get('https://word-racer-server.herokuapp.com/scores/all');
        // let position = data.filter(score => score.username === username)
        let position = data.findIndex(score => score.username === username)
        setPosition(position + 1);
    }

    return (
        <div className="retry-menu">
            <table className="high-scores-table">
                <thead>
                    <tr className="high-scores-header">
                        <th className="high-scores-column">Pos</th>
                        <th className="high-scores-column">Username</th>
                        <th className="high-scores-column">Score</th>
                        <th className="high-scores-column">Level</th>
                    </tr>
                </thead>
                <tr className="high-scores-row" style={{marginBottom: "2em"}}>
                    <td className="high-scores-column">{position}</td>
                    <td className="high-scores-column">{username}</td>
                    <td className="high-scores-column">{score}</td>
                    <td className="high-scores-column">{level}</td>
                </tr>
            </table>
            <PlayButtons reset={resetGame} />
            <Link to="/high-scores">
                <HighScores />
            </Link>
        </div>
    )
}