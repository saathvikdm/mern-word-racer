import { useState, useEffect } from "react";
// Usage

const keyPressArray = [];
let index = 0;
let letterIndex = 0;

const word = 'Example';
const wordList = ['example', 'second', 'demo']

function App() {

  
  const [keyPressStack, setKeyPressedStack] = useState([]);
  const [correct , setCorrect] = useState(false);

  // Call our hook for each key that we'd like to monitor

  const happyPress = useKeyPress(wordList[index][letterIndex], setKeyPressedStack, setCorrect);  

  return (
    <div>
      <div>{wordList.toString()}</div>
      <div>
        {happyPress && "😊"}<br/>
        {keyPressStack.toString()}
        {correct && "CORRECT!"}
      </div>
    </div>
  );
}
// Hook
function useKeyPress(targetKey, setKeyPressedStack, setCorrect) {
  const wordListLength = wordList.length;
  console.log(wordList[index].length);
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    
    keyPressArray.push(key);
    console.log(keyPressArray.join(''));
    if(keyPressArray.join('') === wordList[index]) {
      console.log("Point");
      keyPressArray.length = 0;
      index === wordListLength - 1 ? index = 0 : index++;
      console.log('index' + index);
      // console.log(wordList[index].length);
    }

    if(keyPressArray.length === wordList[index].length) {
      keyPressArray.length = 0;
      index === wordListLength - 1 ? index = 0 : index++;
      console.log('index' + index);
      console.log(wordList[index].length);
      console.log('Wrong word! No point.');
    }


    // if (key === targetKey) {
    //   keyPressArray.push(key);
    //   letterIndex++;
    //   setKeyPressedStack(keyPressArray)
    //   setKeyPressed(true);
    //   console.log(keyPressArray.toString());
    //   // if(keyPressArray.join('') === word) { while(keyPressArray.length) { setKeyPressed(false); keyPressArray.pop()}; setKeyPressedStack([]); index++; console.log(keyPressArray); letterIndex = 0;}
    // }
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
