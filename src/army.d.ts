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
        heroes: Unit[],
        henchmen: Unit[]
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
    equipmentSet: string,
    rules: Rule[]
}

export type EquipementData = {
    id: number,
    name: string,
    cost: number,
    brace: boolean,
    rule: string
}

export type EquipementsData = {
    weapons: {
        handToHand: Equipement[],
        missileWeapons: Equipement[],
    },
    armours: Equipement[]
}

export type Army = {
    id: number,
    name: string,
    icon: string,
    equipmentSet1: Equipements,
    equipmentSet2: Equipements,
    units: {
        heroes: Unit[],
        henchmen: Unit[]
    };
}

export type Rule = {
    name?: string,
    effect?: string
};

export type Unit = {
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
    equipmentSet: string,
    rules: Rule[]
}

export type Equipement = {
    id: number,
    name: string,
    cost: number,
    brace: boolean,
    rule: string
}

export type Equipements = {
    weapons: {
        handToHand: Equipement[],
        missileWeapons: Equipement[],
    },
    armours: Equipement[]
}

export type UnitRow = {
    id: number,
    name: string,
    icon: string,
    exp: number,
    cost: number,
    maxLimit: number,
    profil: number[],
    equipWeapon: boolean,
    equipArmor: boolean,
    armor: [],
    weapon: []
    rules: Rule[]
}

export type PlayerArmy = {
    id: number;
    race: number;
    name: string;
    units: {
        heroes: PlayerUnit[];
        henchmen: PlayerUnit[];
    }
}

export type PlayerUnit = {
    id: number;
    weapon: number[];
    armor: number[];
}

export type ItemOption = {
    id: string;
    value: string;
}

export type PlayerArmyLS = {
    id: number;
    race: number;
    name: string;
    units: {
        heroes: PlayerUnitLS[];
        henchmen: PlayerUnitLS[];
    }
}

export type PlayerUnitLS = {
    id: number;
    weapon: number[];
    armor: number[];
}

export type TypedUnit = {
    type: string,
    units: Unit[];
}