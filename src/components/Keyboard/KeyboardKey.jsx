import { useState, useEffect } from 'react'

const KeyboardKey = (props) => {

    const letter = props.data;

    const [active, setActive] = useState(false);


    function useKeyPress() {
        function upHandler({ key }) {
            if (key === letter) {
                setActive(false);
            }
        }

        function downHandler({ key }) {
            if (key === letter) {
                setActive(true);
            }
        }

        useEffect(() => {
            window.addEventListener("keydown", downHandler);
            window.addEventListener("keyup", upHandler);
        }, []);
    }

    useKeyPress();

    return (
        <button type="button" className={`keyboard__key ${active ? 'keyboard__key--press' : ''}`} >{letter}</button>
    )
}

export default KeyboardKey