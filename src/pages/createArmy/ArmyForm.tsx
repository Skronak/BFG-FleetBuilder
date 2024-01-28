import React, {useEffect, useState} from 'react';
import Row from "../../Row";
import InputAddComponent from "../../components/inputAddComponent";
import type {Army, PlayerArmy, TypedUnit, Unit} from "../../army.d.ts";
import "./armyform.css";
import {useDataStore} from "@/store/dataStore";
import UnitModal from "./UnitModal";
import {useNavigate} from "react-router-dom";

interface Props {
  armyId: number;
}

function ArmyForm(props: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [currentUnit, setCurrentUnit] = useState<TypedUnit>()
  const {appData} = useDataStore();
  const [army, setArmy] = useState<Army>();
  const [playerArmy, setPlayerArmy] = useState<PlayerArmy>({
    id: 0,
    name: "",
    race: 0,
    units: {henchmen: [], heroes: []}
  });
  const navigate = useNavigate();

  useEffect(() => {
    const dataLS = localStorage.getItem('playerArmies');
    // let keys: string[] = Object.keys(getArmyData().units);
    // keys.map(k=> {
    //   playerArmy.units[k] = [];
    // });

    let defaultPlayerArmy = {
      id: 1,// todo add uniq identifier
      race: props.armyId,
      name: '',
      units: {
        heroes: [],
        henchmen: []
      }
    };

    if (!dataLS) {
//      setPlayerArmy(JSON.parse(dataLS));// todo save non compatible => reconstruire l'objet
      // TODO => initialiser player army depuis localStorage
    } else {
      setPlayerArmy(defaultPlayerArmy);
    }

    setArmy(getArmyData());
  }, []);

  const getArmyData = (): Army => {

    return appData.find(army => army.id === props.armyId) ?? {
      id: 0,
      name: 'DATA NOT FOUND',
      icon: 'string',
      units: {
        heroes: [],
        henchmen: []
      },
      equipmentSet1: {
        weapons: {
          handToHand: [],
          missileWeapons: [],
        },
        armours: []
      },
      equipmentSet2: {
        weapons: {
          handToHand: [],
          missileWeapons: [],
        },
        armours: []
      }
    };
  }

  const remove = (type: string, id: number) => {
    //setHenchmen(henchmen.filter(todo => todo.id !== id));
  };

  const update = (id: string, updtedTask: any) => {
    /*const units = henchmen.map(todo => {
      if (todo.id === id) {
        return {...todo, task: updtedTask};
      }
      return todo;
    });
    setHenchmen(units);
    */
  };

  const showModal = (data: TypedUnit) => {
    console.log(data);
    setCurrentUnit(data);
    setOpenModal(true);
  }

  return (
    <div className="builder-form">
      <InputAddComponent handleChange={(evt) => setPlayerArmy({...playerArmy, name: evt.target.value})} placeholder={'Warband'}/>
      <div className={"title-cost"}>cost: {Object.keys(playerArmy.units).flatMap(k=>playerArmy.units[k]).map(l=>l.cost).reduce((kv,v)=>kv+v,0)} points</div>

      {openModal && army && (
        <UnitModal
          title='Ajouter une unite'
          onClose={() => (setOpenModal(false))}
          data={currentUnit!}
          equipmentSet1={army.equipmentSet1}
          equipmentSet2={army.equipmentSet2}
          // equipmentSet1={getArmyData().equipmentSet1} // peupler les liste
          // equipmentSet2={}
          onValidate={(val: Unit) => {
            setPlayerArmy({
                ...playerArmy,
                units: {
                  heroes: currentUnit.type == 'heroes'  ? [val, ...playerArmy.units.heroes] : playerArmy.units.heroes,
                  henchmen: currentUnit.type == 'henchmen' ? [val, ...playerArmy.units.henchmen] : playerArmy.units.henchmen
                }
            });
            setOpenModal(false);
          }}
        />
      )}
      {army && Object.entries(army.units).map(entry => (
        <>
          <h2 className={'army-form-label'}>{entry[0]}
            <button className="button-icon" onClick={() => showModal({type: entry[0], units: entry[1]})}>+</button>
          </h2>
          {playerArmy.units && playerArmy.units[entry[0]]
              .map((unit) => (
                <>
                {
                  <Row
                    update={update}
                    remove={remove}
                    key={unit.id}
                    unit={army.units[entry[0]].filter(elt=>elt.id==unit.id)[0]}
                  />
                }
                </>
            ))
          }
        </>
      ))}
      <button onClick={()=>navigate('/list')}>Annuler</button>
      <button>Enregistrer</button>
    </div>
  )
}

export default ArmyForm;
