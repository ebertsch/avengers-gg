import { Collection } from 'fireorm';

interface ItemSource {
    type: string
    from: string
}

@Collection("gear")
export class Gear {
    name: string
    heroId: string
    gearType: string
    perks1: string[]
    perks2: string[]
    perks3: string[]
    rarity: string
    stats: string[]
    sources: ItemSource[]
    id: string
}