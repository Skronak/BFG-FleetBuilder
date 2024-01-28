import React, {useEffect, useState} from "react";
import {Equipements, TypedUnit, Unit} from "@/army";
import ModalWrapper from "@/components/ModalWrapper";
import {getAssetUrl} from "@/components/Utils";
import AccordionActions from '@mui/material/AccordionActions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import "./unit-modal.css";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
interface Props {
  title: string;
  onClose: () => void;
  onValidate: (u: Unit) => void;
  currentElement: Unit;
  data: TypedUnit;
  equipmentSet1: Equipements;
  equipmentSet2: Equipements;
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
          <label>Weapon</label>
          {unit && unit.equipWeapon && (
              <div className={"modal-units-select-container"}>
                {(unit.equipmentSet === 'equipmentSet1' ? (
                    <div className={'weapon-bloc'}>
                      {props.equipmentSet1.weapons.handToHand.map(elt =>
                        <div className="modal-weapon-select-container" key={elt.id}>
                          <span className="modal-weapon-select">
                            <span>{elt.name} - {elt.cost}pts</span>
                            <input type="checkbox"></input>
                          </span>
                        </div>
                      )}
                      {props.equipmentSet1.weapons.missileWeapons.map(elt =>
                        <div className="modal-weapon-select-container" key={elt.id}>
                        <span className="modal-weapon-select">
                          <span>{elt.name} - {elt.cost}pts</span>
                          <input type="checkbox"></input>
                        </span>
                        </div>
                      )}
                    </div>
                ) : (
                  props.equipmentSet2.weapons.handToHand.map(elt =>
                    <div className="modal-weapon-select-container" key={elt.id}>
                          <span className="modal-weapon-select">
                            <span>{elt.name} - {elt.cost}pts</span>
                            <input type="checkbox" checked={unit && unit.id===elt.id}></input>
                          </span>
                    </div>
                  )
                ))
              }
            </div>
          )}
          <label>Armor</label>
          {unit && unit.equipArmor && (
            <input type={"checkbox"}/>
          )}
        </div>
        <Accordion>
          <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
          >
            Accordion 1
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
          >
            Accordion 2
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
          >
            Accordion Actions
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
          <AccordionActions>
            <Button>Cancel</Button>
            <Button>Agree</Button>
          </AccordionActions>
        </Accordion>
      </div>
      <button onClick={props.onClose}>Annuler</button>
      <button onClick={()=>props.onValidate(unit!)}>Ajouter</button>
    </ModalWrapper>
  )
}