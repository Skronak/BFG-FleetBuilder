export type Army = {
    id: number,
    name: string,
    icon: string,
    units: {
        heroes: Unit[],
        henchmen: Unit[]
    };
}

export type Rule = {
    name: string,
    effect: string
};

export type Unit = {
    id: number,
    type: string,
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
    rules: Rule[]
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