import { useState } from 'react';
import Row from "./Row";
import InputAddComponent from "./inputAddComponent";
import InputField from "./components/InputField"
import "./TodoList.css";
import uuid from "uuid";
import {Warband} from "./army";

interface Props {
  warband: Warband;
}

function ArmyForm({warband}: Props) {
  const uuid = require('uuid');
  const [heroes, setHeroes] = useState([
    { id: uuid.v1(), task: "task 1", completed: false },
    { id: uuid.v1(), task: "task 2", completed: true }
  ]);
  const [henchmen, setHenchmen] = useState([
    { id: uuid.v1(), task: "task 1", completed: false },
    { id: uuid.v1(), task: "task 2", completed: true }
  ]);

  const create = (newTodo: { id: string; task: string; completed: boolean; }) => {
    console.log(newTodo);
    setHenchmen([...henchmen, newTodo]);
  };

  const remove = (id: string) => {
    setHenchmen(henchmen.filter(todo => todo.id !== id));
  };

  const update = (id: string, updtedTask: any) => {
    const updatedunits = henchmen.map(todo => {
      if (todo.id === id) {
        return { ...todo, task: updtedTask };
      }
      return todo;
    });
    setHenchmen(updatedunits);
  };

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
    <div>
      <h1>
        <InputField defaultValue={'New warband'} subClass='' />
      </h1>

      <div className={'armyform-hero-label'}>Heroes<button><i className="fa fa-plus-circle"></i></button></div>
      {heroes.map(hero => (
        <Row
            toggleComplete={toggleComplete}
            update={update}
            remove={remove}
            key={hero.id}
            todo={hero}
            data={warband.rules.heroes}
        />))}
      <div>Henchmen<button><i className="fa fa-plus-circle"></i></button></div>
      {henchmen.map(unit => (
        <Row
            toggleComplete={toggleComplete}
            update={update}
            remove={remove}
            key={unit.id}
            todo={unit}
            data={warband.rules.henchmen}
        />
      ))};
      <InputAddComponent createRow={create} />
    </div>
  );
}

export default ArmyForm;
