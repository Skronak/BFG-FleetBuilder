import { create } from 'zustand'
import data from "@/assets/armyData.json";
import items from "@/assets/equipmentData.json";
import {Army, Equipements, PlayerArmy} from "@/army";

type DataStoreType = {
  appData: Army[];
  itemData: Equipements[];
  setAppData: (data: Army[]) => void;
  setItemsData: (data: Army[]) => void;
}

export const useDataStore = create<DataStoreType>((set) => ({
    appData: data,
    itemData: items,
    setAppData: (newData: Army[]) => set({appData: newData}),
    setItemsData: (newData: Army[]) => set({appData: newData}),
}));
