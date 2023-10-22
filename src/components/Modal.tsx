import React, { useState } from "react";
import "./Modal.css";
import {WarBandRule} from "../army";

interface Props {
    onClose: () => void;
    onValidate: (str: any) => void;
    currentElement?: {};
    data: [WarBandRule];
}

export default function Modal(props: Props) {
    const { unit, setUnit} = useState<WarBandRule>();

    const handleChange = (evt: { target: { value: any; }; }) => {
        setUnit(evt.target.value);
    };

  return (
    <>
        <div className="modal active-modal">
          <div className="modal-content">
              <select value={unit} onChange={handleChange}>
                  { props.data.map(elt =>
                      <option value={elt.name}>{elt.name}-{elt.cost} pts</option>
                  )}
              </select>
              <button className="close-modal" onClick={props.onClose}>
              CLOSE
            </button>
          </div>
        </div>
    </>
  );
}