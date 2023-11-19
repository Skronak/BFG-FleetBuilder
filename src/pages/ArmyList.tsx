import React, {useEffect, useState} from "react";
import ArmyForm from "../ArmyForm";
import {Army} from "../army";
import "../App.css";
import InputAddComponent from "../components/inputAddComponent";
import {Link, useNavigate} from "react-router-dom";
import useLocalStorage from "react-use-localstorage";

function Home() {
    const [showPopup, setShowPopup] = useState(false);
    const [showEditList, setShowEditList] = useState(false);
    const [army, setArmy] = useState<Army>();
    const [armyLS, setLocalStorage] = useLocalStorage('player-army', ' Value');
const navigate = useNavigate();
    useEffect(() => {
        setLocalStorage('', {id: 'test', value: 'ezrz'})
//        setArmy(data);
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
            <div>BANDES DISPONIBLES</div>
            <InputAddComponent handleCreate={showPopup} addLabel={'CREER'} placeholder={'new Army'}/>
                <div className="popup">
                    <span className={"user-army-row"}>
                        <button className={"army-name"}>
                            <span className={'army-name'}>Valet du roi</span>
                            <img className={'army-logo'} src={getImageUrl('icon-beast.png')}/>
                            <span>500 pts</span>
                        </button>
                        <button onClick={()=>deleteUserArmy(1)}>del</button>
                    </span>
                </div>
        </div>
    );
}

export default Home
