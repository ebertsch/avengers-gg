import { Loadout } from './loadout'

export interface GearDefinition {
    id: string;
    name: string;
    set: string;
    gearType: string;
    perks1: string[];
    perks2: string[];
    perks3: string[];
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
export type GearSlot = keyof Loadout;
