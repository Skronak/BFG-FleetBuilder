import React, {useState} from "react";
import ReactDOM from "react-dom";
import TodoList from "./TodoList.js";
import "./styles.css";

function App() {

    const [showPopup, setShowPopup] = useState(false);
    const [showEditList, setShowEditList] = useState(false);
    const [warband, setWarband] = useState('');

    const handleButtonClick = () => {
        setShowPopup(true);
    };

    const handlePopupButtonClick = (option) => {
        setShowEditList(true);
        setShowPopup(false);
        setWarband(option);
    };

  return (
      <div className="TodoList">
          {showEditList ? (
              <TodoList warband={warband}/>
          ) : (
              <div>
                  <button onClick={handleButtonClick}>+</button>
                  {showPopup && (
                      <div className="popup">
                          <button onClick={() => handlePopupButtonClick("beastmen")}>
                              Beastmen
                          </button>
                          <button onClick={() => handlePopupButtonClick("human")}>Human</button>
                      </div>
                  )}
              </div>
          )}
      </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
