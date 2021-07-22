import "./WordStack.css";
import { useState, useRef, useEffect, useContext } from "react";
import { ScoreContext } from "../../context/scoreContext";
import ArrayShuffle from "../../utils/ArrayShuffle";

export default function WordStack(props) {

    const { score, setScore, setLevel, isActive, setActive, level, multiplier, setMultiplier } = useContext(ScoreContext);

    const words = props.words;
    const setWords = props.handleWordStack;

    const [randomWords, setRandomWords] = useState(["cleannesses", "deceivable", "enfeebled", "cattle", "recrudesce", "propagandizing", "epigrapher", "grandeur", "sporulating", "proglottis", "vanpoolings", "cohosted", "drains", "untitled", "moundbirds", "circumstantial", "curricles", "thrombus", "repellents", "weirdie", "contrivers", "pedometer", "fanaticism", "exchanged", "harmfulness", "rearousing", "hysterectomy", "digressional", "tomcats", "prelector", "stakeout", "signalizes", "fictionalized", "clank", "unicolor", "nulled", "kittens", "algometers", "reactions", "referral", "aures", "multimode", "tonne", "wildlings", "armlets", "toilsome", "priggisms", "tacklings", "academician", "paupered"]);



    const DEFAULT_SCORE = 100;

    const [typed, setTyped] = useState("");
    const [correct, setCorrect] = useState(null);
    const inputRef = useRef();
    const [keyInput, setKeyInput] = useState('');

    const [time, setTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(null);

    
    let wordMatch;
    let selWordIndex;

    const wordCountdown = 3000;

    useEffect(() => {

        if (score >= 300 * level) {
            setLevel(prevState => prevState + 1);
        }
        let levelUpTimer = (wordCountdown - ((wordCountdown / 10) * level)) > 1200 ? wordCountdown - ((wordCountdown / 10) * level) : 1200;

        setTimeout(() => {
            let data = ArrayShuffle([...randomWords])
            let d = data.pop();
            // console.log(d);
            let temp = [...words];
            temp.push(d);
            setRandomWords(data);
            setWords(temp);
        }, levelUpTimer)

        setActive(true);

        if (words.length === 7) {
            // alert("Game Over");
            setMultiplier(0);
            setActive(false);
            return;
        }

        if (isActive && typed === "") {
            inputRef.current.focus();
        }
    }, [typed, words, setActive, isActive, setWords]);

    function highlightMatchedText(text, highlight, i) {

        const highlighted = new RegExp(`^(${highlight})`, 'iy');
        const parts = text.split(highlighted);

        if(parts[0] === '' && parts[2] === '') {
            selWordIndex = words.indexOf(parts[1]);
            wordMatch = parts[1];
        }

        return <div key={i} className='words__word'> { parts.map((part, i) => 
            <span className={part.toUpperCase() === highlight.toUpperCase() ? "words__word--sel" : '' } key={i} >
                { part }
            </span>)
        } </div>;
    }

    const handleKeyUp = ({ key }) => {

        if (key.length !== 1) {
            setTyped("");
            return;
        }

        let word = wordMatch;
        
        if (words && word && word.toUpperCase() === (keyInput).toUpperCase()) {
            setElapsedTime(Date.now());

            let timeSpent = elapsedTime ? ((time - elapsedTime) / 1000) : 0;

            setKeyInput('');
            inputRef.current.value = "";

            if (score === 0 || timeSpent < 0) { setScore(prevState => prevState + DEFAULT_SCORE); }
            else {
                setScore(prevState => prevState + Math.floor((DEFAULT_SCORE * multiplier - (timeSpent * 10))));
            }

            // console.log("matched");
            let temp = words;
            temp.splice(selWordIndex, 1);
            setWords(temp);
            setMultiplier((multiplier * 1.2).toFixed(2));
            // console.log("Multiplier: " + multiplier);
            setCorrect(true);

            setTimeout(() => { setCorrect(false); }, 400);

        } else {
            setTime(Date.now());
        }
    };

    const handleKeyDown = (e) => {
        if(e.keyCode === 8) {
            setMultiplier(1);
        }
    }


    return (
        <>
            {isActive ?
                <>
                    <div className="wordstack">
                        {words.map((elem, i) => highlightMatchedText(elem, keyInput, i))}

                        <div className="words__input">
                            <input
                                onChange={(e) => { 
                                    let re = /[0-9a-zA-Z]+/g; 
                                    if (re.test(e.target.value)) {
                                        setKeyInput(e.target.value)
                                    } else { e.preventDefault() };
                                }}
                                ref={inputRef}
                                type="text"
                                className={`words--keys ${correct ? "words--keys--correct" : ''}`}
                                id="keys"
                                onKeyUp={(e) => handleKeyUp(e)}
                                onKeyDown={(e) => handleKeyDown(e)}
                            />
                        </div>
                    </div>
                </>
                : ""}
        </>
    );
}