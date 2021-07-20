import React, { useState, useContext } from 'react'
import Keyboard from '../components/Keyboard/Keyboard'
import WordStack from '../components/WordStack/WordStack'
import Score from '../components/Score/Score'
import axios from 'axios';
import { ScoreContext } from '../context/scoreContext';

export default function Game() {

    const [init, setInit] = useState(false);

    const [wordStack, setWordStack] = useState([]);

    // const [currWord]

    const { setMultiplier } = useContext(ScoreContext);

    const getWords = async () => {
        await axios.get('https://random-word-api.herokuapp.com/word?number=50').then(({ data }) => setWordStack(data.splice(0, 4))).catch((err) => console.log(err));
    }

    if (!init) {
        getWords();
        setMultiplier(1);
        setInit(true);
    }

    return (
        <>
            <Score />
            {wordStack.length === 0 ? "Loading..." : <WordStack words={wordStack} handleWordStack={setWordStack} />}
            <Keyboard />
        </>
    )
}
