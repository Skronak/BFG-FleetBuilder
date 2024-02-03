//DATA as represented by the JSON file
export type ArmyData = {
    id: number,
    name: string,
    icon: string,
    units: UnitData[],
    equipmentSet1: {
        "weapons": {
            handToHandWeapons: number[],
            missileWeapons: number[],
        }
        armours: number[]
    },
    equipmentSet2: {
        "weapons": {
            handToHandWeapons: number[],
            missileWeapons: number[],
        }
        armours: number[]
    },
}

export type UnitData = {
    id: number,
    name: string,
    type: string
    icon: string,
    description: string,
    startingExp: number,
    cost: number,
    minLimit: number,
    maxLimit: number,
    profil: number[],
    equipWeapon: boolean,
    equipArmor: boolean,
    equipmentSet: string, //'equipmentSet1' | 'equipmentSet2'
    rules: Rule[]
}

export type EquipementData = {
    id: number,
    name: string,
    cost: number,
    brace: boolean,
    rule: string,
    specialRules: Rule[]
}

export type EquipementsData = {
    weapons: {
        handToHand: EquipementData[],
        missileWeapons: EquipementData[],
    },
    armours: EquipementData[]
}

export type ArmyRef = {
    id: number,
    name: string,
    icon: string,
    units: UnitRef[],
    equipmentSet1: Equipements,
    equipmentSet2: Equipements,
}

export type UnitRef = {
    id: number,
    name: string,
    type: string,
    icon: string,
    description: string,
    startingExp: number,
    cost: number,
    minLimit: number,
    maxLimit: number,
    profil: number[],
    equipWeapon: boolean,
    equipArmor: boolean,
    equipmentSet: string,
    rules: Rule[]
}

export type Rule = {
    name?: string,
    effect?: string
};


export type Equipement = {
    id: number,
    name: string,
    cost: number,
    brace: boolean,
    rule: string,
    specialRules: Rule[]
}

export type Equipements = {
    weapons: Equipement[]
    armours: Equipement[]
}

export type PlayerArmy = {
    id: number;
    race: number;
    name: string;
    cost: number;
    units: PlayerUnit[];
}

export type PlayerUnit = {
    id: number;
    id_unit: number;
    type: string;
    weapon: number[];
    armor: number[];
}