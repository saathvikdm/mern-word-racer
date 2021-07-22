import React, { useContext } from 'react'
import { ScoreContext } from '../context/scoreContext'
import { PlayButtons, SaveButton, HighScores } from '../components/Buttons/Buttons'
import './MenuStyles.css'
import Score from '../components/Score/Score';
import { Link } from 'react-router-dom';

export default function RetryMenu() {
    const { setActive, setSaved } = useContext(ScoreContext);

    function resetGame() {
        setActive(true);
        setSaved(0);
    }

    return (
        <div className="retry-menu">
            <Score />
            <h3 className="retry-menu-info">Stack limit reached</h3>
            <PlayButtons reset={resetGame} />
            <Link to="/save-score">
                <SaveButton />
            </Link>
            <Link to="/high-scores">
                <HighScores />
            </Link>
        </div>
    )
}