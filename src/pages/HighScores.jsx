import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { GoBack } from '../components/Buttons/Buttons';
import { Link } from 'react-router-dom'


export default function SaveScorePage() {

    const [scores, setScores] = useState(null);

    useEffect(() => {
        // axios.get('http://localhost:5000/scores').then(({ data }) => setScores(data)).catch((err) => console.log(err));
        axios.get('https://word-racer-server.herokuapp.com/scores').then(({ data }) => setScores(data)).catch((err) => console.log(err));
    }, [])


    return (
        <div className="high-scores-page">
            <h1>High Scores</h1>
            <table className="high-scores-table">
                <thead>
                    <tr className="high-scores-header">
                        <th className="high-scores-column">Pos</th>
                        <th className="high-scores-column">Username</th>
                        <th className="high-scores-column">Score</th>
                        <th className="high-scores-column">Level</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        scores ? scores.map(({ username, score, level }, i) => (
                            <tr className="high-scores-row">
                                <td className="high-scores-column">{i + 1}</td>
                                <td className="high-scores-column">{username}</td>
                                <td className="high-scores-column">{score}</td>
                                <td className="high-scores-column">{level}</td>
                            </tr>
                        )) : "loading"
                    }

                </tbody>
            </table>

            <Link to="/">
                <GoBack />
            </Link>
        </div>
    )
}
