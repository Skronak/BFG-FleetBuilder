import React, { useState } from 'react';
import Row from "./Row";
import InputAddComponent from "./inputAddComponent";
import InputField from "./components/InputField"
import "./armyform.css";
import uuid from "uuid";
import {PlayerUnit, Warband, WarBandRule} from "./army";
import Modal from './components/Modal'

interface Props {
  warband: Warband;
}

function ArmyForm({warband}: Props) {
  const uuid = require('uuid');
  const [openModal, setOpenModal] = useState(false);
  const [currentUnit, setCurrentUnit] = useState<WarBandRule[]>()
  const [heroes, setHeroes] = useState<PlayerUnit[]>([]);
  const [cost, setCost] = useState<number>(0);

  const [henchmen, setHenchmen] = useState([
    { id: uuid.v1(), task: "task 1", completed: false },
    { id: uuid.v1(), task: "task 2", completed: true }
  ]);

  const create = (newTodo: { id: string; task: string; completed: boolean; }) => {
    setHenchmen([...henchmen, newTodo]);
  };

  const calculatCost = () => {
//    setCost(heroes.map(value => value.))
  }
  const remove = (id: string) => {
    setHenchmen(henchmen.filter(todo => todo.id !== id));
  };

  const update = (id: string, updtedTask: any) => {
    const units = henchmen.map(todo => {
      if (todo.id === id) {
        return { ...todo, task: updtedTask };
      }
      return todo;
    });
    setHenchmen(units);
  };

  const showModal = (data: WarBandRule[]) => {
      setCurrentUnit(data);
      setOpenModal(true);
  }

  const toggleComplete = (id: string) => {
    const updatedunits = henchmen.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setHenchmen(updatedunits);
  };

  return (
    <>
      <h1>
        <InputField defaultValue={'New warband'} subClass='' />
      </h1>
      <div className={"title-cost"}>
        cost: {cost} points
      </div>

      {openModal && (
        <Modal
            onClose={()=>(setOpenModal(false))}
            data={currentUnit!}
            onValidate={(val: any)=> setHeroes([
              ...heroes,
              { id: val.id }
            ])}
        />
      )}
      {Object.entries(warband.rules).map(entry => (
        <>
        <h2 className={'army-form-label'}>{entry[0]}<button className="button-icon" onClick={()=>showModal(entry[1])}><i className="fa fa-plus-circle"></i></button></h2>
        {/* TODO    PARCOURS CONTENU UTILISATEUR PAS DATA*/}
        {entry[1].map((unit: WarBandRule) => (
            <>
              <Row
                  toggleComplete={toggleComplete}
                  update={update}
                  remove={remove}
                  key={unit.id}
                  todo={unit}
                  data={unit}/>
              <InputAddComponent createRow={create}/>
            </>
        ))
        }
        </>
      ))}
    </>
  );
}

export default ArmyForm;
