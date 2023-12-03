import React, {useState} from "react";
import {Army, Unit} from "@/army";
import ModalWrapper from "@/components/ModalWrapper";
import {getAssetUrl, getArmyIcon} from "@/components/Utils";
import './armySelectModal.css';
import {useNavigate} from "react-router-dom";

interface Props {
    onClose: () => void;
    currentElement?: {};
    data: Army[];
    title: string;
}

export default function ArmySelectModal(props: Props) {
    const [unit, setUnit] = useState<Unit>();
    const navigate = useNavigate();

    return (
        <ModalWrapper title={props.title} onClose={props.onClose}>
            <div className={"armyList"}>
                {props.data.map(army => (
                    <button key={army.id} className={"army-name"}  onClick={()=>navigate('/create/'+army.id)}>
                        <img className={'army-logo'} src={getAssetUrl(army.icon)}/>
                        <span className={'army-name'}>{army.name}</span>
                    </button>
                ))}
            </div>
        </ModalWrapper>
    );
}
