import "./WordStack.css";
import { useState, useRef, useEffect, useContext } from "react";
import { v4 as uuid } from "uuid";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ScoreContext, TimeContext } from "../../context/scoreContext";
import ArrayShuffle from "../../utils/ArrayShuffle";

export default function WordStack(props) {

    const { score, setScore, setLevel, isActive, setActive, level } = useContext(ScoreContext);

    const words = props.words;
    const setWords = props.handleWordStack;

    const [randomWords, setRandomWords] = useState(["cleannesses", "deceivable", "enfeebled", "cattle", "recrudesce", "propagandizing", "epigrapher", "grandeur", "sporulating", "proglottis", "vanpoolings", "cohosted", "drains", "untitled", "moundbirds", "circumstantial", "curricles", "thrombus", "repellents", "weirdie", "contrivers", "pedometer", "fanaticism", "exchanged", "harmfulness", "rearousing", "hysterectomy", "digressional", "tomcats", "prelector", "stakeout", "signalizes", "fictionalized", "clank", "unicolor", "nulled", "kittens", "algometers", "reactions", "referral", "aures", "multimode", "tonne", "wildlings", "armlets", "toilsome", "priggisms", "tacklings", "academician", "paupered"]);

    const DEFAULT_SCORE = 100;

    const [typed, setTyped] = useState("");
    const [correct, setCorrect] = useState(null);
    const inputRef = useRef();
    const [keyInput, setKeyInput] = useState(null);

    const [time, setTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(null);

    const [wordCountdown, setWordCountdown] = useState(3000);

    useEffect(() => {

        if (score >= 300 * level) {
            setLevel(prevState => prevState + 1);
        }
        let levelUpTimer = wordCountdown - ((wordCountdown / 10) * level);

        setTimeout(() => {
            let data = ArrayShuffle([...randomWords])
            let d = data.pop();
            console.log(d);
            let temp = [...words];
            temp.push(d);
            setRandomWords(data);
            setWords(temp);
        }, levelUpTimer)

        setActive(true);

        if (words.length === 7) {
            // alert("Game Over");
            setActive(false);
            return;
        }

        if (words.length === 0) {
            setActive(false);
            console.log("finish");
        }

        if (isActive && typed === "") {
            inputRef.current.focus();
        }
    }, [typed, words, setActive, isActive, setWords]);

    const handleKeyUp = ({ key }) => {

        if (key.length !== 1) {
            setTyped("");
            return;
        }


        let [firstWord] = words;

        if (words && firstWord.toUpperCase() === (keyInput).toUpperCase()) {
            setElapsedTime(Date.now());
            let timeSpent = (time - elapsedTime) / 1000;
            console.log(timeSpent);
            setKeyInput('');
            inputRef.current.value = "";

            if (score === 0) { setScore(prevState => prevState + DEFAULT_SCORE); }
            else {
                setScore(prevState => prevState + Math.floor((DEFAULT_SCORE - (timeSpent * 10))));
            }

            console.log("matched");
            let temp = words;
            temp.splice(0, 1);
            setWords(temp);
            setCorrect(true);

            setTimeout(() => { setCorrect(false); }, 400);

        } else {
            setTime(Date.now());
            console.log("didnt match. removing word");
        }

        if (words.length === 0) {
            setActive(false);
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
                                onChange={(e) => setKeyInput(e.target.value)}
                                ref={inputRef}
                                type="text"
                                className={`words--keys ${correct ? "words--keys--correct" : ''}`}
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