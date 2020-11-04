export interface GearDefinition {
    id: string;
    name: string;
    set: string;
    gearType: string;
    perks: [string[], string[], string[]];
    stats: string[];
    rarity: string;
    sources: ItemSource[];
    heroId: string;
}

export interface ItemSource {
    type: string;
    from: string;
}

export interface StatInstance {
    stat: Stat
    value: number
}

export type GearRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'exotic'
export type Stat = 'might' | 'precision' | 'resolve' | 'resilience' | 'proficiency' | 'valor'
