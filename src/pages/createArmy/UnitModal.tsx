import React, {useEffect, useState} from "react";
import {Equipements, TypedUnit, Unit} from "@/army";
import {getAssetUrl, getPortraitAssetUrl} from "@/components/Utils";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./unit-modal.css";
import {Accordion, AccordionDetails, AccordionSummary, Checkbox, Drawer, IconButton, Typography} from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
interface Props {
    title: string;
    onClose: () => void;
    onValidate: (u: Unit) => void;
    data: TypedUnit;
    equipmentSet1: Equipements;
    equipmentSet2: Equipements;
}

export default function UnitModal(props: Props) {
    const [unit, setUnit] = useState<Unit>();
    const [checked, setChecked] = React.useState([0]);
    type Anchor = 'left'|'right';
    const [state, setState] = React.useState({
        left: false,
        right: false,
    });

    useEffect(() => {
        setUnit(props.data.units[0]);
    }, []);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
        const toggleDrawer =
            (anchor: Anchor, open: boolean) =>
                (event: React.KeyboardEvent | React.MouseEvent) => {
                    if (
                        event.type === 'keydown' &&
                        ((event as React.KeyboardEvent).key === 'Tab' ||
                            (event as React.KeyboardEvent).key === 'Shift')
                    ) {
                        return;
                    }

                    setState({ ...state, [anchor]: open });
                };

        const list = (anchor: Anchor) => (
            <Box
                sx={{ width: '70%' }}
                role="presentation"
                // onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
            >
                <Divider />
                <List sx={{ width: '100%', maxWidth: 420, bgcolor: 'background.paper' }}>
                    {props.equipmentSet1.weapons.handToHand.map((elt, index) => {
                        const labelId = `checkbox-list-label-${elt.id}`;

                        return (
                            <ListItem
                                alignItems="flex-start"
                                disablePadding
                            >
                                <ListItemButton role={undefined} onClick={handleToggle(elt.id)} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checked.indexOf(elt.id) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{'aria-labelledby': labelId}}
                                            sx={{ }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId}
                                                  primary={`${elt.name} - ${elt.cost}gc`}
                                                  secondary={
                                                      <React.Fragment>
                                                          <Typography
                                                              sx={{ display: 'inline' }}
                                                              component="span"
                                                              variant="body2"
                                                              color="text.primary"
                                                          >
                                                              {elt.rule}
                                                          </Typography>
                                                          <Divider variant="inset" component="li" />
                                                          {elt.specialRules.map(rule=> {
                                                              return (
                                                                  <span>
                                                                  <Typography
                                                                      sx={{ display: 'inline' }}
                                                                      component="span"
                                                                      variant="body2"
                                                                      color="text.primary"
                                                                  >
                                                                      {rule.name}:
                                                                  </Typography>
                                                                  {rule.effect}
    </span>
                                                          )
                                                              })}
                                                      </React.Fragment>
                                                  }/>
                                </ListItemButton>
                            </ListItem>);
                    })}
            </List>
            </Box>
        );

    return (
        <div title={props.title}>
            <div className={"modal-units-select-container"}>
                {props.data.units
                    .sort((e1, e2) => e1.cost - e2.cost)
                    .map(elt =>
                            <div className="modal-unit-select-container" key={elt.id}>
              <span className="modal-unit-select" onClick={() => setUnit(elt)}>
                <span>{elt.name} - {elt.cost}gc</span>
                <img className={"modal-unit-icon"} src={getPortraitAssetUrl(elt.icon)}/>
                <input type="checkbox" checked={unit && unit.id === elt.id}></input>
              </span>
                            </div>
                    )}
            </div>
            <div>
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel3-content"
                        id="panel3-header"
                    >
                        Background
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={"modal-unit-description modal-unit-container"}>
                            {unit && unit.description}
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel3-content"
                        id="panel3-header"
                    >
                        Unit Profil
                    </AccordionSummary>
                    <AccordionDetails>
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
                    </AccordionDetails>
                </Accordion>

                <div className={"modal-unit-container"}>

                    {unit && unit.equipWeapon && (
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Additionnal Equipement
                            </AccordionSummary>
                            <AccordionDetails>
                                {(['left'] as const).map((anchor) => (
                                    <React.Fragment key={anchor}>
                                        <Button onClick={toggleDrawer(anchor, true)}>Edit weapons</Button>
                                        <Drawer
                                            anchor={anchor}
                                            open={state[anchor]}
                                            onClose={toggleDrawer(anchor, false)}
                                        >
                                            {list(anchor)}
                                        </Drawer>
                                    </React.Fragment>
                                ))}
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
                            <input type="checkbox" checked={unit && unit.id === elt.id}></input>
                          </span>
                                                </div>
                                        )
                                    ))
                                    }
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    )}
                </div>
                {(['right'] as const).map((anchor) => (
                    <React.Fragment key={anchor}>
                        <Button onClick={toggleDrawer(anchor, true)}>Add armor</Button>
                        <Drawer
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                        >
                            {list(anchor)}
                        </Drawer>
                    </React.Fragment>
                ))}
                <label>Total Cost : {unit? unit.cost : 0}</label>
            </div>
            <button onClick={props.onClose}>Annuler</button>
            <button onClick={() => props.onValidate(unit!)}>Ajouter</button>
        </div>
    )
}