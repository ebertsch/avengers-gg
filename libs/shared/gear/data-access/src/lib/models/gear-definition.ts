import { ItemSource } from '@avengers-game-guide/shared/data';

export interface GearDefinition {
    id: string;
    name: string;
    set: string;
    gearType: string;
    perks?: [string[], string[], string[]]
    perks1: string[];
    perks2: string[];
    perks3: string[];
    stats: string[];
    rarity: string;
    sources: ItemSource[];
    heroId: string;
}
