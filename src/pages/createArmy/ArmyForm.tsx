import React, {useEffect, useState} from 'react';
import InputAddComponent from "../../components/inputAddComponent";
import type {ArmyRef, PlayerArmy, PlayerUnit, UnitRef} from "../../army.d.ts";
import "./armyform.css";
import {useDataStore} from "@/store/dataStore";
import UnitModal from "./UnitModal";
import {useNavigate} from "react-router-dom";
import {Modal, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useLocalStorageDataStore} from "@/store/localStorageDataStore";
import Row from "@/Row";

interface Props {
  armyId?: number;
  raceId?: number;
}

const defaultPlayerArmy = {
  id: 0,
  name: "",
  race: 0,
  cost: 0,
  units: []
}

function ArmyForm(props: Props) {
  const [modalUnitRefs, setModalUnitRefs] = useState<UnitRef[]>()
  const {appData} = useDataStore();
  const {playerArmies, setPlayerArmies} = useLocalStorageDataStore();
  const [open, setOpen] = React.useState(false);
  const [armyRef, setArmyRef] = useState<ArmyRef>();
  const [selectedPlayerUnit, setselectedPlayerUnit] = useState<PlayerUnit>();
  const [playerArmy, setPlayerArmy] = useState<PlayerArmy>(defaultPlayerArmy);
  const navigate = useNavigate();
  let unitType = ['heroes', 'henchmen'];

  useEffect(() => {
    let raceId = 0
    if(!!props.armyId) { // EDIT MODE
      let army = playerArmies.find(army => army.id === props.armyId!);
      if (army) {
        raceId = army.race;
        setPlayerArmy(army);
      }
    } else if (!!props.raceId) { // NEW ARMY
      setPlayerArmy({
        ...playerArmy,
        id: playerArmies.length > 0 ? Math.max(...playerArmies.map(army=> +army.id))+1 : 1,
        race: props.raceId,
      });
    }

    setArmyRef(getArmyData(raceId));
  }, []);

  useEffect(() => {
    if (armyRef) {
      unitType = [...new Set(armyRef!.units.map(unit => unit.type))];
    }
  }, [armyRef]);

  const getArmyData = (raceId: number): ArmyRef => {

    return appData.find(army => army.id === raceId) ?? {
      id: 0,
      name: 'DATA NOT FOUND',
      icon: 'string',
      units: [],
      equipmentSet1: {
        weapons: [],
        armours: []
      },
      equipmentSet2: {
        weapons: [],
        armours: []
      }
    };
  }

  const remove = (type: string, id: number) => {
    //setHenchmen(henchmen.filter(todo => todo.id !== id));
  };

  const edit = () => {
    // setselectedPlayerUnit(playerUnit);
    // showModal(unit)
  };

  const saveArmy=() => {
    let newPlayerArmies = [];
    if(props.armyId) {
      newPlayerArmies = [playerArmy, ...playerArmies.filter(army => army.id !== props.armyId)];
    } else {
      newPlayerArmies = [...playerArmies, playerArmy];
    }
    setPlayerArmies(newPlayerArmies);
    localStorage.setItem('playerArmies', JSON.stringify(newPlayerArmies));

    navigate('/list');
  }

  const handleClose = () => setOpen(false);
  const showModal = (type: string) => {
    setModalUnitRefs(armyRef?.units.filter(unit=>unit.type === type));
    setOpen(true);
  }

  const unitToPlayerUnit = (unit: UnitRef, weapons: number[], armor: number[]): PlayerUnit => {
    return {
      id: Math.max(...playerArmy.units.map(unit=>unit.id))+1,
      id_unit: unit.id,
      type: unit.type,
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
      <InputAddComponent value={playerArmy.name} handleChange={(evt) => setPlayerArmy({...playerArmy, name: evt.target.value})} placeholder={'Warband Name'}/>
      <div className={"title-cost"}>cost: {Object.keys(playerArmy.units).flatMap(k=>playerArmy.units[k]).map(l=>l.cost).reduce((kv,v)=>kv+v,0)} points</div>

      {armyRef && (
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
                data={modalUnitRefs}
                equipmentSet1={armyRef.equipmentSet1}
                equipmentSet2={armyRef.equipmentSet2}
                playerUnit={selectedPlayerUnit?selectedPlayerUnit:undefined}
/*                onEdit={}*/
                onValidate={(val: UnitRef, weapons: number[], armor: number[]) => {
                  setPlayerArmy({
                    ...playerArmy,
                    units: [unitToPlayerUnit(val, weapons, armor), ...playerArmy.units],
                  });
                  setOpen(false);
                }}
            />
          </Box>
        </Modal>
      </div>
      )}

      {armyRef && unitType.map(type => (
        <>
          <h2 className={'armyRef-form-label'}>{type}
            <button className="button-icon" onClick={() => showModal(type)}>+</button>
          </h2>
          {playerArmy.units && playerArmy.units.filter(unit=>unit.type==type).map((unit: PlayerUnit) => (
                  <Row
                    edit={edit}
                    remove={remove}
                    key={unit.id}
                    unit={armyRef.units.filter(elt=>elt.id==unit.id)[0]}
                  />
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
