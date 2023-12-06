import React, {useEffect, useState} from 'react';
import Row from "../../Row";
import InputAddComponent from "../../components/inputAddComponent";
import InputField from "../../components/InputField"
import type {PlayerUnit, Army, Unit, PlayerArmy} from "../../army.d.ts";
import "./armyform.css";
import {useDataStore} from "@/store/dataStore";
import useLocalStorage from "react-use-localstorage";
import AddUnitModal from "../../components/AddUnitModal";

interface Props {
  armyId: number;
}

function ArmyForm(props: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [currentUnit, setCurrentUnit] = useState<Unit[]>()
  const [heroes, setHeroes] = useState<PlayerUnit[]>([]);
  const [henchmen, setHenchmen] = useState([]);
  const [cost, setCost] = useState<number>(0);

  const {appData} = useDataStore();
  const [playerArmy, setPlayerArmy] = useState<PlayerArmy>();

  useEffect(() => {
    const dataLS = localStorage.getItem('playerArmies');
    if (dataLS) {
      setPlayerArmy(JSON.parse(dataLS));
    }
  }, []);

  const getArmyData = (): Army => {
    return appData.find(army=> army.id === props.armyId) || {id: 0,
      name: 'string',
      icon: 'string',
      units: {
        heroes: [],
        henchmen: []
      }}
  }

  const create = (newTodo: { id: string; task: string; completed: boolean; }) => {
    setHenchmen([...henchmen, newTodo]);
  };

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

  const showModal = (data: Unit[]) => {
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
    <div className="builder-form">
      <InputAddComponent handleChange={()=> null} placeholder={'Warband'}/>
      <div className={"title-cost"}>cost: {cost} points</div>

      {openModal && (
        <AddUnitModal
          title='Ajouter une unite'
            onClose={()=>(setOpenModal(false))}
            data={currentUnit!}
            onValidate={(val: any)=> setHeroes([
              ...heroes,
              { id: val.id }
            ])}
        />
      )}
      {Object.entries(getArmyData().units).map(entry => (
        <>
        <h2 className={'army-form-label'}>{entry[0]}<button className="button-icon" onClick={()=>showModal(entry[1])}><i className="fa fa-plus-circle"></i></button></h2>
        {entry[1].map((unit: Unit) => (
            <>
              <Row
                  toggleComplete={toggleComplete}
                  update={update}
                  remove={remove}
                  key={unit.id}
                  todo={unit}
                  data={unit}/>
            </>
        ))
        }
        </>
      ))}
      <button>Enregistrer</button>
    </div>
  )
}

export default ArmyForm;
