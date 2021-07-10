import "./WordStack.css";
import { useState, useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function WordStack() {

    const [words, setWords] = useState([
        "hello",
        "heat",
        "bye",
        "corona",
        "health",
        "happy",
        "good",
        "great"
    ]);
    const [typed, setTyped] = useState("");
    const [correct, setCorrect] = useState(null);
    const inputRef = useRef();

    useEffect(() => {
        if (typed === "") {
            inputRef.current.focus();
            inputRef.current.value = "";
        }

        window.addEventListener("keydown", downHandler);

        function downHandler() {
            inputRef.current.focus();
        }

    }, [typed]);

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
                setCorrect(prevState => prevState + 1);
                console.log("matched");
                setTimeout(() => setCorrect(0), 400)
            } else {
                setCorrect(0);
                console.log("didnt match. removing word");
            }

            let temp = [...words];

            let removed = temp.splice(0, 1);
            temp.push(...removed);
            setWords(temp);
            setTyped("");
        }
    };

    return (
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
                    className={`words--keys ${correct ? "words--keys--correct" : ''}`}
                    id="keys"
                    onKeyUp={(e) => handleKeyUp(e)}
                />
            </div>
        </div>
    );
}
