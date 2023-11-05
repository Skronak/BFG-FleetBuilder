import data from "./assets/armyData.json";
import {Army} from "./army";
import React, {useState} from "react";
import ArmyForm from "./ArmyForm";
import {Link} from "react-router-dom";

export function ArmyCreateForm() {
    const [showEditList, setShowEditList] = useState(false);
    const [army, setArmy] = useState<Army>();

    const getImageUrl = (name: string) => {
        return new URL(`./assets/${name}`, import.meta.url).href;
    }

    const handlePopupButtonClick = (option: Army) => {
        setShowEditList(true);
        setArmy(option);
    };

    return (showEditList ? (
            <ArmyForm/>
        ) : (
        <div className="builder-form">
            {data.map((army: Army) => (
                    <button className={"army-name"} onClick={() => handlePopupButtonClick(army)}>
                        <span className={'army-name'}>{army.name}</span>
                        <img className={'army-logo'} src={getImageUrl(army.icon)}/>
                    </button>
                ))}
            <Link to="/">Home</Link>
        </div>
    ))
}