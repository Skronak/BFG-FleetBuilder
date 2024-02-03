import {create} from 'zustand'
import data from "@/assets/armyData.json";
import items from "@/assets/equipmentData.json";
import {ArmyRef, ArmyData, EquipementsData, UnitData} from "@/army";

type DataStoreType = {
  appData: ArmyRef[];
  setAppData: (data: ArmyRef[]) => void;
}
const transformArmyDataToArmy = (data: ArmyData[], items: EquipementsData): ArmyRef[] => {

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

        return ({
            ...army,
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
    setAppData: (newData: ArmyRef[]) => set({appData: newData}),
}));