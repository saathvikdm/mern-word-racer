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
    const [saved, setSaved] = useState(0);
    const [success, setSuccess] = useState(0);

    const data = { username, score, level };

    function handleSave() {
        if(!username) {
            setSuccess(2);
            setTimeout(() => { setSuccess(0) }, 1500);
        } else {
        setSaved(1);
        axios
            .post(`https://word-racer-server.herokuapp.com/scores`, data)
            .then((res) => {
                setSaved(2);
                // alert("Saved Successfully");
                setSuccess(1);
                setTimeout(() => { setSuccess(0) }, 400);
                setTimeout(() => { setSaved(0) }, 3000);
            })
            .catch((err) => console.log(err));
    
        }
    }

    return (
        <>
            <Score />
            <div className="save-score-page">
                <p>{success === 0 && success !== 1 ? "" : "Username cannot be empty." }</p>
                <input type="text" className={`save-score-input ${success === 0 ? "" : success === 1 ? "save-score-input--success": 'save-score-input--failure' }`} placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
                <SaveScore handleSave={handleSave} saved={saved} />
                <Link to="/">
                    <GoBack />
                </Link>
            </div>
        </>
    )
}
