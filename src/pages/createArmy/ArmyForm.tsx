import React, {useEffect, useState} from 'react';
import Row from "../../Row";
import InputAddComponent from "../../components/inputAddComponent";
import type {Army, PlayerArmy, TypedUnit, Unit} from "../../army.d.ts";
import "./armyform.css";
import {useDataStore} from "@/store/dataStore";
import UnitModal from "./UnitModal";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {Modal, Typography} from "@mui/material";
import Box from "@mui/material/Box";

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const showModal = (data: TypedUnit) => {
    console.log(data);
    setOpen(true);
    setCurrentUnit(data);
    setOpenModal(true);
  }
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
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
                  setOpen(false);
                }}
            />
          </Box>
        </Modal>
      </div>
      )}

      {openModal && false && army && (
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
