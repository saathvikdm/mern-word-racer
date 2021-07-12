import React, { useContext, useState } from 'react';
import { SaveScore } from '../components/Buttons/Buttons';
import Score from '../components/Score/Score';
import { ScoreContext } from '../context/scoreContext';
import { Link } from 'react-router-dom';
import { GoBack } from '../components/Buttons/Buttons';
import axios from 'axios';


export default function SaveScorePage() {

    const { score, level } = useContext(ScoreContext);
    const [username, setUsername] = useState(null);

    const data = { username, score, level };

    function handleSave() {
        axios
            .post(`https://word-racer-server.herokuapp.com/scores`, data)
            .then((res) => {
                alert("Saved Successfully");
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <Score />
            <div className="save-score-page">
                <input type="text" className="save-score-input" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
                <SaveScore handleSave={handleSave} />
                <Link to="/">
                    <GoBack />
                </Link>
            </div>
        </>
    )
}
