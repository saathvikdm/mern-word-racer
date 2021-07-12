import React, { useState } from 'react'
import Keyboard from '../components/Keyboard/Keyboard'
import WordStack from '../components/WordStack/WordStack'
import Score from '../components/Score/Score'
import axios from 'axios';

export default function Game() {

    const [init, setInit] = useState(false);

    const [wordStack, setWordStack] = useState([]);

    const getWords = async () => {
        await axios.get('https://random-word-api.herokuapp.com/word?number=4').then(({ data }) => setWordStack(data)).catch((err) => console.log(err));
    }

    if (!init) {
        getWords();
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
