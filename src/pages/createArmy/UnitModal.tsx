import React, {useEffect, useState} from "react";
import {TypedUnit, Unit} from "@/army";
import ModalWrapper from "@/components/ModalWrapper";
import {getAssetUrl} from "@/components/Utils";

import "./unit-modal.css";
interface Props {
  title: string;
  onClose: () => void;
  onValidate: (Unit) => void;
  currentElement: Unit;
  data: TypedUnit;
}

export default function UnitModal(props: Props) {
  const [unit, setUnit] = useState<Unit>();

  useEffect(() => {
    setUnit(props.data.units[0]);
  }, []);

  const handleChange = (evt: { target: { value: any; }; }) => {
    setUnit(props.data.units.find(elt => elt.id === +evt.target.value));
  };


  return (
    <ModalWrapper title={props.title} onClose={props.onClose}>
      <div className={"modal-units-select-container"}>
          {props.data.units
          .sort((e1, e2) => e1.cost-e2.cost)
          .map(elt =>
            <div className="modal-unit-select-container" key={elt.id}>
              <span className="modal-unit-select" onClick={() => setUnit(elt)}>
                <span>{elt.name} - {elt.cost}pts</span>
                <img className={"modal-unit-icon"} src={getAssetUrl(elt.icon)}/>
                <input type="checkbox" checked={unit && unit.id===elt.id}></input>
              </span>
            </div>
          )}
      </div>
      <div>
        <span>Description</span>
        <div className={"modal-unit-description modal-unit-container"}>
          {unit && unit.description}
        </div>
        <span>Profil</span>
        <div className={"modal-unit-container"}>
          {unit && unit.profil.length !== 0 && (
            <table className={"modal-unit-profil-table"}>
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
        <span>Rules</span>
        <div className={"modal-unit-container modal-unit-rules"}>
          {unit && unit.rules && unit.rules.map(rule =>
            <div>{rule.name} : {rule.effect}</div>
          )}
        </div>
        <div className={"modal-unit-container"}>
          <label>Equipement</label>
          {unit && unit.equipArmor && (
            <input type={"checkbox"}/>
          )}
        </div>
      </div>
      <button onClick={props.onClose}>Annuler</button>
      <button onClick={()=>props.onValidate(unit)}>Ajouter</button>
    </ModalWrapper>
  )
}