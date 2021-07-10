import { useState, useEffect } from "react";
// Usage

const keyPressArray = [];
let index = 0;
let letterIndex = 0;

const wordList = ['example', 'second', 'demo']

function App() {

  const [points, setPoints] = useState(0);
  const [keyInput, setKeyInput] = useState('');
  const [correctWords, setCorrectWord] = useState([]);

  // Call our hook for each key that we'd like to monitor

  useKeyPress(wordList[index][letterIndex], points, setKeyInput, setPoints, setCorrectWord);  

  return (
    <div>
      <div>{wordList.toString()} and Points: {points}</div>
      
      <div>
        {keyInput}
        {correctWords}
      </div>
    </div>
  );
}


// Hook
function useKeyPress(targetKey, points, setKeyInput, setPoints, setCorrectWord) {
  
  const [keyPressed, setKeyPressed] = useState(false);
  const wordListLength = wordList.length;
  console.log(wordList[index].length);
  // State for keeping track of whether key is pressed
  // If pressed key is our target key then set to true
  function downHandler({ key }) {

    keyPressArray.push(key);
    console.log(keyPressArray.join(''));

    if(keyPressArray.join('') === wordList[index]) {
      const wordItem = wordList[index]
      wordList.filter(`${wordItem}`)
      setPoints(points + 1);
      keyPressArray.length = 0;
      index === wordListLength - 1 ? index = 0 : index++;
      console.log('index' + index);
      setCorrectWord(keyPressArray.join(''))
      // console.log(wordList[index].length);
    }

    if(keyPressArray.length === wordList[index].length) {
      keyPressArray.length = 0;
      index === wordListLength - 1 ? index = 0 : index++;
      console.log('index' + index);
      console.log(wordList[index].length);
      console.log('Wrong word! No point.');
    }

    setKeyInput(key);
  }
  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  },); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}

export default App;
