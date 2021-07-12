import React, { useContext } from 'react'
import { ScoreContext } from '../context/scoreContext'
import { PlayButtons, SaveScore, HighScores } from '../components/Buttons/Buttons'
import './MenuStyles.css'
import Score from '../components/Score/Score';
import { Link } from 'react-router-dom';

export default function RetryMenu() {
    const { setActive } = useContext(ScoreContext);

    function resetGame() {
        setActive(true);
    }

    return (
        <div className="retry-menu">
            <Score />
            <h3 className="retry-menu-info">Stack limit reached</h3>
            <PlayButtons reset={resetGame} />
            <Link to="/save-score">
                <SaveScore />
            </Link>
            <Link to="/high-scores">
                <HighScores />
            </Link>
        </div>
    )
}