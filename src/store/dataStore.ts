import {create} from 'zustand'
import data from "@/assets/armyData.json";
import items from "@/assets/equipmentData.json";
import {Army, ArmyData, EquipementsData} from "@/army";

type DataStoreType = {
  appData: Army[];
  setAppData: (data: Army[]) => void;
}
const transformArmyFromDataTo = (data: ArmyData[], items: EquipementsData): Army[] => {

    return data.map(army => {
        let weaponsSet1 = {
            handToHand: items.weapons.handToHand.filter(eq => army.equipmentSet1.weapons.handToHandWeapons.includes(eq.id)),
            missileWeapons: items.weapons.missileWeapons.filter(eq => army.equipmentSet1.weapons.missileWeapons.includes(eq.id))
        };
        let weaponsSet2 = {
            handToHand: items.weapons.handToHand.filter(eq => army.equipmentSet2.weapons.handToHandWeapons.includes(eq.id)),
            missileWeapons: items.weapons.missileWeapons.filter(eq => army.equipmentSet2.weapons.missileWeapons.includes(eq.id))
        };
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
    appData: transformArmyFromDataTo(data, items),
    setAppData: (newData: Army[]) => set({appData: newData}),
}));