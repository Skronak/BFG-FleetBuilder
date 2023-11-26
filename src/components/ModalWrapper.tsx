import React, {PropsWithChildren, useState} from "react";
import "./Modal.css";
import {Unit} from "@/army";

interface Props extends PropsWithChildren {
    onClose: () => void;
}

export default function ModalWrapper(props: Props) {
    const [unit, setUnit] = useState<Unit>();

    return (
        <>
            <div className="modal active-modal">
                <div className="modal-content">
                    <button className="close-modal" onClick={props.onClose}>X</button>
                    {props.children}
                </div>
            </div>
        </>
    );
}