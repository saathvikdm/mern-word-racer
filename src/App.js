import { useState, useEffect } from "react";
// Usage

const keyPressArray = [];
let index = 0;
const word = 'Example';

function App() {

  
  const [keyPressStack, setKeyPressedStack] = useState([]);
  const [correct , setCorrect] = useState(false);
  

  // Call our hook for each key that we'd like to monitor
  const happyPress = useKeyPress(word[index], setKeyPressedStack, setCorrect);
  

  

  return (
    <div>
      <div>{word}</div>
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
  
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    if (key === targetKey) {
      keyPressArray.push(key);
      index++;
      setKeyPressedStack(keyPressArray)
      setKeyPressed(true);
      console.log(keyPressArray.toString());
      if(keyPressArray.join('') === word) { setCorrect(true);  alert('COrrects');}
    }
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
