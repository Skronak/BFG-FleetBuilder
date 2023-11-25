import React, { useState } from "react";
import "./Modal.css";
import {Unit} from "@/army";

interface Props {
    onClose: () => void;
    onValidate: (str: any) => void;
    currentElement?: {};
    data: Unit[];
}

export default function Modal(props: Props) {
    const [ unit, setUnit] = useState<Unit>();

    const handleChange = (evt: { target: { value: any; }; }) => {
        setUnit(props.data.find(elt => elt.id === +evt.target.value));
    };

  return (
    <>
        <div className="modal active-modal">
          <div className="modal-content">
              <select onChange={handleChange}>
                  { props.data.map(elt =>
                      <option key={elt.id} value={elt.id}>{elt.name}-{elt.cost} pts</option>
                  )}
              </select>
              <button className="close-modal" onClick={props.onClose}>
              CLOSE
            </button>
              {unit && unit.profil.length !== 0 && (
              <table>
                  <tr>
                      <th>M</th>
                      <th>WS</th>
                      <th>BS</th>
                      <th>S</th>
                      <th>T</th>
                      <th>W</th>
                      <th>I</th>
                      <th>A</th>
                      <th>Ld</th>
                  </tr>
                  <tr>
                      <td>{unit.profil[0]}</td>
                      <td>{unit.profil[1]}</td>
                      <td>{unit.profil[2]}</td>
                      <td>{unit.profil[3]}</td>
                      <td>{unit.profil[4]}</td>
                      <td>{unit.profil[5]}</td>
                      <td>{unit.profil[6]}</td>
                      <td>{unit.profil[7]}</td>
                      <td>{unit.profil[8]}</td>
                  </tr>
              </table>)}
          </div>
        </div>
    </>
  );
}