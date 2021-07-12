import "./WordStack.css";
import { useState, useRef, useEffect, useContext } from "react";
import { v4 as uuid } from "uuid";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ScoreContext } from "../../context/scoreContext";
import ArrayShuffle from "../../utils/ArrayShuffle";

export default function WordStack(props) {

    const { score, setScore, setLevel, isActive, setActive } = useContext(ScoreContext);

    const words = props.words;
    const setWords = props.handleWordStack;

    const [randomWords, setRandomWords] = useState(["cleannesses", "deceivable", "enfeebled", "cattle", "recrudesce", "propagandizing", "epigrapher", "grandeur", "sporulating", "proglottis", "vanpoolings", "cohosted", "drains", "untitled", "moundbirds", "circumstantial", "curricles", "thrombus", "repellents", "weirdie", "contrivers", "pedometer", "fanaticism", "exchanged", "harmfulness", "rearousing", "hysterectomy", "digressional", "tomcats", "prelector", "stakeout", "signalizes", "fictionalized", "clank", "unicolor", "nulled", "kittens", "algometers", "reactions", "referral", "aures", "multimode", "tonne", "wildlings", "armlets", "toilsome", "priggisms", "tacklings", "academician", "paupered"]);

    // const randomWords = props.randomWords;

    const DEFAULT_SCORE = 100;

    const [typed, setTyped] = useState("");
    const [correct, setCorrect] = useState(null);
    const inputRef = useRef();
    const [keyInput, setKeyInput] = useState(null);

    useEffect(() => {


        setTimeout(() => {
            let data = ArrayShuffle([...randomWords])
            let d = data.pop();
            console.log(d);
            let temp = [...words];
            temp.push(d);
            setRandomWords(data);
            setWords(temp);
        }, 3000)

        setActive(true);

        if (words.length === 7) {
            alert("Game Over");
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

        if (firstWord.toUpperCase() === (keyInput).toUpperCase()) {
            setKeyInput('');
            inputRef.current.value = "";
            setScore(prevState => prevState + DEFAULT_SCORE);
            console.log("matched");
            let temp = words;
            temp.splice(0, 1);
            setWords(temp);
            setCorrect(true);
            if (score >= 200 && score % 200 === 0) {
                setLevel(prevState => prevState + 1)
            }
            setTimeout(() => { setCorrect(false); }, 400);

        } else {
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