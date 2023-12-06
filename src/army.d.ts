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
    name: string,
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

export type PlayerArmy = {
    race: number;
    name: string;
    units: [{
        heroes: PlayerUnit[];
        henchmen: PlayerUnit[];
    }]
}

export type ItemOption = {
    id: string;
    value: string;
}

export type PlayerUnit = {
    id: number;
    weapon: number[];
    armor: number[];
}