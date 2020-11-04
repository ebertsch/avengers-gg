import { GearInstance, SerializedGearInstance } from './gear-instance';

export interface Loadout {
    melee: GearInstance | string
    ranged: GearInstance | string
    defense: GearInstance | string
    heroic: GearInstance | string
    majorArtifact: GearInstance | string
    minorArtifact1: GearInstance | string
    minorArtifact2: GearInstance | string
}

export interface SerializedLoadout {
    m: SerializedGearInstance | string
    r: SerializedGearInstance | string
    d: SerializedGearInstance | string
    h: SerializedGearInstance | string
    ma: SerializedGearInstance | string
    ma1: SerializedGearInstance | string
    ma2: SerializedGearInstance | string
}
