import React, {PropsWithChildren, useState} from "react";
import "./Modal.css";
import {Unit} from "@/army";

interface Props extends PropsWithChildren {
    onClose: () => void;
    title?: string;
}

export default function ModalWrapper(props: Props) {
    const [unit, setUnit] = useState<Unit>();

    return (
        <div className="modal-underlay" onClick={props.onClose}>
            <div className="modal active-modal">
                <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
                    <div className="modal-header">
                    <span>{props.title}</span>
                        <button className="close-modal" onClick={props.onClose}>X</button>
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}