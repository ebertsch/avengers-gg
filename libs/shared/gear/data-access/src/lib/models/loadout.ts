import { GearInstance, SerializedGearInstance } from './gear-instance';

export interface Loadout {
    melee: GearInstance
    ranged: GearInstance
    defense: GearInstance
    heroic: GearInstance
    majorArtifact: GearInstance
    minorArtifact1: GearInstance
    minorArtifact2: GearInstance
}

export interface SerializedLoadout {
    m: SerializedGearInstance
    r: SerializedGearInstance
    d: SerializedGearInstance
    h: SerializedGearInstance
    a: SerializedGearInstance
    ma1: SerializedGearInstance
    ma2: SerializedGearInstance
}
