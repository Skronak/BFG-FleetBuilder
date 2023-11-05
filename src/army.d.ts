export type Army = {
    id: number,
    name: string,
    icon: string,
    units: {
        heroes: Unit[],
        henchmen: Unit[]
    };
}

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
    rules: [{
        "name": string,
        "effect": string
    }]
}

export type PlayerArmy = {
    race: number;
    name: string;
    hero: [{
        id: number;
        weapon:[PlayerUnit];
        armor: [PlayerUnit]
    }];
    henchmen: [{
        id: number;
        weapon:[PlayerUnit];
        armor: [PlayerUnit]
    }];
}

export type PlayerUnit = {
    id: number;
}