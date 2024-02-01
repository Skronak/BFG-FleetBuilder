import React, {useEffect, useState} from 'react';
import Row from "../../Row";
import InputAddComponent from "../../components/inputAddComponent";
import type {Army, PlayerArmy, PlayerUnit, TypedUnit, Unit} from "../../army.d.ts";
import "./armyform.css";
import {useDataStore} from "@/store/dataStore";
import UnitModal from "./UnitModal";
import {useNavigate} from "react-router-dom";
import {Modal, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useLocalStorageDataStore} from "@/store/localStorageDataStore";

interface Props {
  armyId?: number;
  raceId?: number;
}

function ArmyForm(props: Props) {
  const [currentUnit, setCurrentUnit] = useState<TypedUnit>()
  const {appData} = useDataStore();
  const {playerArmies, setPlayerArmies} = useLocalStorageDataStore();
  const [open, setOpen] = React.useState(false);
  const [army, setArmy] = useState<Army>();
  const [playerArmy, setPlayerArmy] = useState<PlayerArmy>({
    id: 0,
    name: "",
    race: 0,
    cost: 0,
    units: {henchmen: [], heroes: []}
  });
  const navigate = useNavigate();

  useEffect(() => {
    if(!!props.armyId) {
      let playerArmy = playerArmies.find(army => army.id = props.armyId!);
      //TODO init
    } else {
      let defaultPlayerArmy = {
        id: Math.max(...playerArmies.map(army=> +army.id))+1,
        race: props.raceId,
        name: '',
        cost: 0,
        units: {
          heroes: [],
          henchmen: []
        }
      };
      setPlayerArmy(defaultPlayerArmy);
    }

    setArmy(getArmyData());
  }, []);

  const getArmyData = (): Army => {

    return appData.find(army => army.id === props.raceId) ?? {
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

  const edit = (type: string, id: number) => {
    //setHenchmen(henchmen.filter(todo => todo.id !== id));
  };

  const saveArmy=() => {
    let newPlayerArmies = [...playerArmies, playerArmy];
    setPlayerArmies(newPlayerArmies);
    localStorage.setItem('playerArmies', JSON.stringify(newPlayerArmies));

    navigate('/list');
  }

  const handleClose = () => setOpen(false);
  const showModal = (data: TypedUnit) => {
    setOpen(true);
    setCurrentUnit(data);
  }

  const unitToPlayerUnit = (unit: Unit, type: string, weapons: number[],armor: number[]) => {
    return {
      id: unit.id,
      type: type,
      weapon: weapons,
      armor: armor
    }
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <div className="builder-form">
      <InputAddComponent handleChange={(evt) => setPlayerArmy({...playerArmy, name: evt.target.value})} placeholder={'Warband'}/>
      <div className={"title-cost"}>cost: {Object.keys(playerArmy.units).flatMap(k=>playerArmy.units[k]).map(l=>l.cost).reduce((kv,v)=>kv+v,0)} points</div>

      {army && (
      <div>
        <Modal
            open={open}
            sx={{ 'z-index': 1 }}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <UnitModal
                title='Ajouter une unite'
                onClose={() => (handleClose)}
                data={currentUnit!}
                equipmentSet1={army.equipmentSet1}
                equipmentSet2={army.equipmentSet2}
                onValidate={(val: Unit, weapons: number[], armor: number[]) => {
                  setPlayerArmy({
                    ...playerArmy,
                    units: {
                      heroes: currentUnit!.type == 'heroes'  ? [unitToPlayerUnit(val, 'heroes', weapons, armor), ...playerArmy.units.heroes] : playerArmy.units.heroes,
                      henchmen: currentUnit!.type == 'henchmen' ? [val, ...playerArmy.units.henchmen] : playerArmy.units.henchmen
                    }
                  });
                  setOpen(false);
                }}
            />
          </Box>
        </Modal>
      </div>
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
                    update={edit}
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
      <button onClick={()=>saveArmy()}>Enregistrer</button>
    </div>
  )
}

export default ArmyForm;
