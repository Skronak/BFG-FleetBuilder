export type Warband = {
    name: string,
    icon: string,
    rules: {
        heroes: [WarBandRule],
        henchmen: [WarBandRule]
    };
}

export type WarBandRule = {
    name: string,
    description: string,
    startingExp: number,
    cost: number,
    minLimit: number,
    maxLimit: number,
    profil: [],
    equipWeapon: boolean,
    equipArmor: boolean,
    rules: [{
        "name": string,
        "effect": string
    }]
}