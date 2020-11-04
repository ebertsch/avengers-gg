import { GearRarity, StatInstance } from './gear-definition';

export interface GearInstance {
    id?: string
    slot: string
    rarity: GearRarity
    powerLevel: number
    stat1: StatInstance
    stat2: StatInstance
    stat3: StatInstance
    perk1: string;
    perk2: string;
    perk3: string;
}

export interface SerializedGearInstance {
    i: string
    p1: string
    p2: string
    p3: string
    pl: number
    r: string
    s: string
    s1n: string
    s1v: number
    s2n: string
    s2v: number
    s3n: string
    s3v: number
  }