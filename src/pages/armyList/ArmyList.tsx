import React, {useEffect, useState} from "react";
import InputAddComponent from "@/components/inputAddComponent";
import {useNavigate} from "react-router-dom";
import data from "@/assets/armyData.json";
import ActionButton from "../../components/ActionButton";
import {Army, PlayerArmy} from "@/army";

import "../../App.css";
import './army-list.css';
import {TypeActionButton} from "@/constants";
import {useDataStore} from "@/store/dataStore";
import Modal from "@/components/Modal";
import ModalWrapper from "@/components/ModalWrapper";
import ArmySelectModal from "@/pages/armyList/ArmySelectModal";
import {getAssetUrl, getArmyIcon} from "@/components/Utils";

import app from "@/App";

function Home() {
    const [showPopup, setShowPopup] = useState(false);
    const [showEditList, setShowEditList] = useState(false);
    const [army, setArmy] = useState<Army>();
    const [playerArmy, setPlayerArmy] = useState<PlayerArmy[]>();
    const navigate = useNavigate();
    const {appData} = useDataStore();

    useEffect(() => {
        // setLocalStorage(JSON.stringify({id: 'test', value: 'ezrz'}));
        localStorage.setItem('playerArmies', JSON.stringify([{
            race: 1,
            name: 'Knight of Azueri',
            hero: [],
            henchmen: [],
        }]));
        const playerArmy = localStorage.getItem('playerArmies');
        setPlayerArmy(playerArmy? JSON.parse(playerArmy) : null);
    }, []);

    const handleButtonClick = () => {
        setShowPopup(true);
    };

    function getImageUrl(name: string) {
        return new URL(`/src/assets/${name}`, import.meta.url).href;
    }

    function deleteUserArmy(id: number) {
    }

    return (
        <div className="builder-form">
            <div>BANDES DISPONIBLES</div>
            <InputAddComponent handleCreate={()=>setShowPopup(true)} addLabel={'CREER'} placeholder={'new Army'}/>
            {showPopup && (<ArmySelectModal onClose={()=>setShowPopup(false)} data={appData}/>)}
            <br/>
            <div className="player-armies">
                    {playerArmy && playerArmy.map(army=> (
                        <span className={"user-army-row"}>
                            <button className={"army-name"}>
                                <img className={'army-logo'} src={getArmyIcon(appData, army.race)}/>
                                <span className={'army-name'}>{army.name}</span>
                                <span>500 pts</span>
                            </button>
                            {<ActionButton buttonType={TypeActionButton.MODIFIER}/>}
                            <button className={'icon-button'}><img src={'/src/assets/icons/ico_editer.svg'}/></button>
                            <button className={'icon-button'}>edit</button>
                            <button className={'icon-button'} onClick={()=>deleteUserArmy(1)}>del</button>
                        </span>
                        ))}
                </div>
        </div>
    );
}

export default Home
