import {create} from 'zustand'
import data from "@/assets/armyData.json";
import items from "@/assets/equipmentData.json";
import {Army, ArmyData, EquipementsData, UnitData} from "@/army";

type DataStoreType = {
  appData: Army[];
  setAppData: (data: Army[]) => void;
}
const transformArmyDataToArmy = (data: ArmyData[], items: EquipementsData): Army[] => {

    return data.map(army => {
        let weaponsSet1 =
            items.weapons.handToHand.filter(eq => army.equipmentSet1.weapons.handToHandWeapons.includes(eq.id)).map(weapon => {
                return {
                    ...weapon,
                    type: 'handToHand'
                }
            }).concat(
            items.weapons.missileWeapons.filter(eq => army.equipmentSet1.weapons.missileWeapons.includes(eq.id)).map(weapon => {
                return {
                    ...weapon,
                    type: 'missileWeapons'
                }
            }))

        let weaponsSet2 =
            items.weapons.handToHand.filter(eq => army.equipmentSet2.weapons.handToHandWeapons.includes(eq.id)).map(weapon => {
                return {
                    ...weapon,
                    type: 'handToHand'
                }
            }).concat(
            items.weapons.missileWeapons.filter(eq => army.equipmentSet2.weapons.missileWeapons.includes(eq.id)).map(weapon => {
                return {
                    ...weapon,
                    type: 'missileWeapons'
                }
            }));

        let armorSet1 = items.armours.filter(eq => army.equipmentSet1.armours.includes(eq.id));
        let armorSet2 = items.armours.filter(eq => army.equipmentSet1.armours.includes(eq.id));

        let heroes = army.units.heroes.map(unit => {
            return {
                ...unit,
                type: 'heroes'
            }
        });

        let henchmen = army.units.henchmen.map(unit => {
            return {
                ...unit,
                type: 'henchmen'
            }
        });
/*        Object.entries(army.units).forEach(units => {
            units[1] = units[1].map(elt=> {
                return {
                    ...elt,
                    type: units[0]
                }});
        })*/

        return ({
            ...army,
            units: {
                heroes: heroes,
                henchmen: henchmen
            },
            equipmentSet1: {
                weapons: weaponsSet1,
                armours: armorSet1
            },
            equipmentSet2: {
                weapons: weaponsSet2,
                armours: armorSet2
            }
        })
    });
}

export const useDataStore = create<DataStoreType>((set) => ({
    appData: transformArmyDataToArmy(data, items),
    setAppData: (newData: Army[]) => set({appData: newData}),
}));