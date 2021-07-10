import './components/Keyboard/Keyboard.css'
import Keyboard from "./components/Keyboard/Keyboard";
import WordStack from './components/WordStack/WordStack';

function App() {

    return (
        <div className="app">
          <WordStack/>
          <Keyboard/>
        </div>
      );
}

export default App;

