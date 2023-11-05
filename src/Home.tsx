import React, {useEffect, useState} from "react";
import ArmyForm from "./ArmyForm";
import {Army} from "./army";
import "./App.css";
import InputAddComponent from "./components/inputAddComponent";
import {Link} from "react-router-dom";

function Home() {
    const [showPopup, setShowPopup] = useState(false);
    const [showEditList, setShowEditList] = useState(false);
    const [army, setArmy] = useState<Army>();

    useEffect(() => {
//        setArmy(data); init from cache//bdd
    }, []);

    const handleButtonClick = () => {
        setShowPopup(true);
    };

    function getImageUrl(name: string) {
        return new URL(`./assets/${name}`, import.meta.url).href;
    }

    function deleteUserArmy(id: number) {

    }

    return (
        <div className="builder-form">
            {showEditList ? (
                <ArmyForm/>
            ) : (
                <div>
                    {showPopup ? (
                        <div className="popup">
                            {/*// mock data*/}
                            <span className={"user-army-row"}>
                                <button className={"army-name"}>
                                    <span className={'army-name'}>Valet du roi</span>
                                    <img className={'army-logo'} src={getImageUrl('icon-beast.png')}/>
                                    <span>500 pts</span>
                                </button>
                                <button onClick={()=>deleteUserArmy(1)}>del</button>
                            </span>
                            <Link to="/create">
                                <InputAddComponent handleCreate={()=>null} addLabel={'CREER'} placeholder={'new Army'}/>
                            </Link>

                        </div>
                    ) : (
                        <button className='index' onClick={handleButtonClick}>MORDHEIM</button>
                    )}
                </div>
            )}
        </div>
    );
}

export default Home
