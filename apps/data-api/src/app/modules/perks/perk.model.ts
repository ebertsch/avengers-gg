import { Collection } from 'fireorm';

@Collection("perks")
export class Perk {
    id: string
    title: string
    heroes: string[]
    description: string
    gear: string[]
    slot1Enabled: boolean
    slot2Enabled: boolean
    slot3Enabled: boolean
    gearSpecific: boolean
    isReady: boolean
}