import { GearRarity, StatInstance } from '@avengers-game-guide/shared/data'

export interface GearInstance {
    id: string
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
    s1n: string
    s1v: number
    s2n: string
    s2v: number
    s3n: string
    s3v: number
  }