import React, {useState} from "react";
import {Army, Unit} from "@/army";
import ModalWrapper from "@/components/ModalWrapper";
import {getAssetUrl, getArmyIcon} from "@/components/Utils";
import './armySelectModal.css';

interface Props {
    onClose: () => void;
    currentElement?: {};
    data: Army[];
}

export default function ArmySelectModal(props: Props) {
    const [unit, setUnit] = useState<Unit>();

    return (
        <ModalWrapper onClose={props.onClose}>
            <div className={"armyList"}>
                {props.data.map(army => (
                    <button className={"army-name"}>
                        <img className={'army-logo'} src={getAssetUrl(army.icon)}/>
                        <span className={'army-name'}>{army.name}</span>
                    </button>
                ))}
            </div>
        </ModalWrapper>
    );
}
