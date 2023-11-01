export type Warband = {
    name: string,
    icon: string,
    rules: {
        heroes: WarBandRule[],
        henchmen: WarBandRule[]
    };
}

export type WarBandRule = {
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