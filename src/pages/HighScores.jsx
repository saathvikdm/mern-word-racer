import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { GoBack } from '../components/Buttons/Buttons';
import { Link } from 'react-router-dom'


export default function SaveScorePage() {

    const [scores, setScores] = useState(null);
    const [allScores, setAllScores] = useState(null);

    useEffect(() => {
        // axios.get('http://localhost:5000/scores').then(({ data }) => setScores(data)).catch((err) => console.log(err));
        axios.get('https://word-racer-server.herokuapp.com/scores').then(({ data }) => setScores(data)).catch((err) => console.log(err));
        axios.get('https://word-racer-server.herokuapp.com/scores/all').then(({ data }) => setAllScores(data)).catch((err) => console.log(err));
    }, [])

    let average = 0;

    if (allScores) {


        for (let i = 0; i < allScores.length; i++) {
            average = average + allScores[i].score;
        }

        average = (average / allScores.length).toFixed(0);
    }

    return (
        <div className="high-scores-page">
            <h1>High Scores</h1>
            <table>
                <tr className="high-scores-header">
                    <th className="high-scores-column">Average score: {average ? average : ""}</th>
                    <th className="high-scores-column">Max level reached: {scores ? scores[0].level : ""}</th>
                </tr>
            </table>
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
