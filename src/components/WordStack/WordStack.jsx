import "./WordStack.css";
import { useState, useRef, useEffect, useContext } from "react";
import { v4 as uuid } from "uuid";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ScoreContext } from "../../context/scoreContext";

export default function WordStack() {

    const { score, setScore, setLevel, isActive, setActive, wordStack, setWordStack } = useContext(ScoreContext);

    const DEFAULT_SCORE = 100;

    const [words, setWords] = useState(wordStack.slice(0, 6));

    const [typed, setTyped] = useState("");
    const [correct, setCorrect] = useState(null);
    const inputRef = useRef();


    useEffect(() => {

        setActive(true);

        if (words.length === 0) {
            setActive(false);
            console.log("finish");
        }

        if (isActive && typed === "") {
            inputRef.current.focus();
            inputRef.current.value = "";
        }
    }, [typed, words, setActive, isActive]);



    const handleKeyUp = ({ key }) => {

        if (key.length !== 1) {
            setTyped("");
            return;
        }


        let [firstWord] = words;

        if (typed.length < firstWord.length - 1) {
            setTyped(typed + key);
        } else {
            setTyped(typed + key);
            if (firstWord.toUpperCase() === (typed + key).toUpperCase()) {
                setCorrect(true);
                setScore(prevState => prevState + DEFAULT_SCORE);
                console.log("matched");
                let temp = words;
                temp.splice(0, 1);
                setWords(temp);
                setTimeout(() => setCorrect(null), 400)
                if (score >= 200 && score % 200 === 0) {
                    setLevel(prevState => prevState + 1)
                }
            } else {
                setCorrect(false);
                setTimeout(() => setCorrect(null), 400)
                console.log("didnt match. removing word");
            }
            setTyped("");
        }
    };


    return (
        <>
            {isActive ?
                <>
                    <div className="wordstack">
                        <TransitionGroup className="words">
                            {words.map((w, i) => {
                                return (
                                    <CSSTransition key={i} timeout={500} classNames="words">
                                        <div className="words__word" key={uuid()}>
                                            {w}
                                        </div>
                                    </CSSTransition>
                                );
                            })}
                        </TransitionGroup>

                        <div className="words__input">
                            <input
                                ref={inputRef}
                                type="text"
                                className={`words--keys ${correct === null ? '' : correct ? "words--keys--correct" : 'words--keys--wrong'}`}
                                id="keys"
                                onKeyUp={(e) => handleKeyUp(e)}
                            />
                        </div>
                    </div>
                </>
                // : <PlayButtons reset={resetGame} />}
                : ""}
        </>
    );
}
