export interface Loadout {
    melee: GearTemplate | string
    ranged: GearTemplate | string
    defense: GearTemplate | string
    heroic: GearTemplate | string
    majorArtifact: GearTemplate | string
    minorArtifact1: GearTemplate | string
    minorArtifact2: GearTemplate | string
}

export enum GearRarity {
    Common = "common",
    Uncommon = "uncommon",
    Rare = "rare",
    Epic = "epic",
    Legendary = "legendary",
    Exotic = "exotic"
}

export type Stat = 'might' | 'precision' | 'resolve' | 'resilience' | 'proficiency' | 'valor'

export interface StatInstance {
    stat: Stat
    value: number
}

export interface GearTemplate {
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

export interface MinimalGear {
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