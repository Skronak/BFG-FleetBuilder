import React, {useEffect, useState} from "react";
import ActionButton from "../../components/ActionButton";
import {PlayerArmy} from "@/army";

import "../../App.css";
import './army-list.css';
import {TypeActionButton} from "@/constants";
import {useDataStore} from "@/store/dataStore";
import ArmySelectModal from "@/pages/armyList/ArmySelectModal";
import {getArmyIcon} from "@/components/Utils";

export default function ListArmyPage() {
    const [showPopup, setShowPopup] = useState(false);
    const [playerArmy, setPlayerArmy] = useState<PlayerArmy[]>();
    const {appData} = useDataStore();

    useEffect(() => {
        localStorage.setItem('playerArmies', JSON.stringify([{
            id: 1,
            race: 1,
            name: 'Knight of Azueri',
            units: [{
                heroes: [{
                  id: 1,
                  weapon: [],
                  armor: [],
                }],
                henchmen: [{
                  id: 1,
                  weapon: [],
                  armor: [],
                }]}
              ]
        }]));
        const playerArmy = localStorage.getItem('playerArmies');
        setPlayerArmy(playerArmy ? JSON.parse(playerArmy) : null);
    }, []);

    function getImageUrl(name: string) {
        return new URL(`/src/assets/${name}`, import.meta.url).href;
    }

    function deleteUserArmy(id: number) {
    }

    return (
        <div className="builder-form">
            <div>WARBANDES DISPONIBLES</div>
            {/*<InputAddComponent handleCreate={() => setShowPopup(true)} addLabel={'CREER'} placeholder={'new Army'}/>*/}
            <button className={"army-name"} onClick={() => setShowPopup(true)}>+</button>
            {showPopup && (
                <ArmySelectModal title="Selectionnez une armée" onClose={() => setShowPopup(false)} data={appData}/>)}
            <br/>
            <div className="player-armies">
                {playerArmy && playerArmy.map(army => (
                    <span key={army.id} className={"user-army-row"}>
                            <button className={"army-name"}>
                                <img className={'army-logo'} src={getArmyIcon(appData, army.race)}/>
                                <span className={'army-name'}>{army.name}</span>
                                <span>500 pts</span>
                            </button>
                        {<ActionButton buttonType={TypeActionButton.MODIFIER}/>}
                        <button className={'icon-button'}><img src={'/src/assets/icons/ico_editer.svg'}/></button>
                            <button className={'icon-button'}>edit</button>
                            <button className={'icon-button'} onClick={() => deleteUserArmy(1)}>del</button>
                        </span>
                ))}
            </div>
        </div>
    );
}