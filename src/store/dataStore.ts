import { create } from 'zustand'
import data from "@/assets/armyData.json";
import {Army, PlayerArmy} from "@/army";

type DataStoreType = {
  appData: Army[];
  setAppData: (data: Army[]) => void;
}

export const useDataStore = create<DataStoreType>((set) => ({
    appData: data,
    setAppData: (newData: Army[]) => set({appData: newData}),
}));
