import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import ArmyForm from "./ArmyForm.tsx";
import data from "./armyData.json";
import "./styles.css";

function App() {

    const [showPopup, setShowPopup] = useState(false);
    const [showEditList, setShowEditList] = useState(false);
    const [army, setArmy] = useState('');

    useEffect(()=> {
//        setArmy(data);
    },[]);

    const handleButtonClick = () => {
        setShowPopup(true);
    };

    const handlePopupButtonClick = (option) => {
        setShowEditList(true);
        setShowPopup(false);
        setArmy(option);
    };

  return (
      <div className="builder-form">
          {showEditList ? (
              <ArmyForm warband={army}/>
          ) : (
              <div>
                  <button className='index' onClick={handleButtonClick}>CREATE WARBAND</button>
                  {showPopup && (
                      <div className="popup">
                          { data.map(army =>
                              <button className={"army-name"} onClick={() => handlePopupButtonClick(army)}>
                                  <span className={'army-name'}>{army.name}</span>
                                  <img className={'army-logo'} src={require(`./${army.icon}`)}/> {/*https://stackoverflow.com/questions/39999367/how-do-i-reference-a-local-image-in-react*/}
                              </button>
                          )}
                      </div>
                  )}
              </div>
          )}
      </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
