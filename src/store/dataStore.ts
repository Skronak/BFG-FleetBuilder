import {create} from 'zustand'
import armyData from "@/assets/armyData.json";
import equipData from "@/assets/equipmentData.json";
import {WarbandRef, WarbandData, Equipements, EquipementsData, UserWarband} from "@/army";


// Datastore for everything from json file to avoid unecessary db call
type DataStoreType = {
  appData: WarbandRef[];
  setAppData: (data: WarbandRef[]) => void;
  equipementData: EquipementsData;
  setEquipementData: (data: Equipements) => void;
  userData: UserWarband[];
  setUserData: (data: UserWarband[]) => void;
}

const transformArmyDataToArmy = (armyData: WarbandData[]): WarbandRef[] => {

    return armyData.map(army => {
        return {
            ...army,
            units: army.units.map((unit) => {
                return {
                    id: unit.id,
                    name: unit.name,
                    type: unit.type,
                    icon: unit.icon,
                    description: unit.description,
                    startingExp: unit.startingExp,
                    cost: unit.cost,
                    minLimit: unit.minLimit,
                    maxLimit: unit.maxLimit,
                    profils: unit.profils,
                    skills: unit.skills,
                    rules: unit.rules,
                    weaponProfiency:unit.weaponHthProficiency.concat(unit.weaponMissileProficiency),
                    armoursProficiency: unit.armourProficiency,
                    miscellaneaousProficiency: [],
                }
            })
        }
    })
}

export const useDataStore = create<DataStoreType>((set) => ({
    appData: transformArmyDataToArmy(armyData),
    equipementData: equipData,
    userData: null,
    setAppData: (newData: WarbandRef[]) => set({appData: newData}),
    setEquipementData: (newData: Equipements) => set({equipementData: newData}),
    setUserData: (newData: UserWarband[]) => set({userData: newData})
}));