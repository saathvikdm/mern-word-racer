import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { GoBack } from '../components/Buttons/Buttons';
import { Link } from 'react-router-dom'


export default function SaveScorePage() {

    const [scores, setScores] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/scores').then(({ data }) => setScores(data)).catch((err) => console.log(err));
    }, [])


    return (
        <div className="high-scores-page">
            <h1>High Scores</h1>
            {
                scores ? scores.map(({ username, score, level }) => (
                    <h2>{username}: {score}</h2>
                )) : "loading"
            }
            <Link to="/">
                <GoBack />
            </Link>
        </div>
    )
}
