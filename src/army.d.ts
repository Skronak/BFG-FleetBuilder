//DATA as represented by the JSON file
export type ArmyData = {
    id: number,
    name: string,
    icon: string,
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
    units: {
        heroes: UnitData[],
        henchmen: UnitData[]
    };
}

export type UnitData = {
    id: number,
    name: string,
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

export type Army = {
    id: number,
    name: string,
    icon: string,
    units: {
        heroes: Unit[],
        henchmen: Unit[]
    };
    equipmentSet1: Equipements,
    equipmentSet2: Equipements,
}

export type Rule = {
    name?: string,
    effect?: string
};

export type Unit = { //Ajoute le type ici
    id: number,
    name: string,
    type?: string,
    icon: string,
    description: string,
    startingExp: number,
    cost: number,
    minLimit: number,
    maxLimit: number,
    profil: number[],
    equipWeapon: boolean,
    equipArmor: boolean,
    equipmentSet: 'equipmentSet1' | 'equipmentSet2',
    rules: Rule[]
}

export type Equipement = {
    id: number,
    name: string,
    cost: number,
    brace: boolean,
    rule: string,
    specialRules: Rule[]
}

export type Equipements = {
    weapons: {
        handToHand: Equipement[],
        missileWeapons: Equipement[],
    },
    armours: Equipement[]
}

export type PlayerArmy = {
    id: number;
    race: number;
    name: string;
    cost: number;
    units: {
        heroes: PlayerUnit[];
        henchmen: PlayerUnit[];
    }
}

export type PlayerUnit = {
    id: number;
    type: string;
    weapon: number[];
    armor: number[];
}

export type TypedUnit = {
    type: string,
    units: Unit[];
}