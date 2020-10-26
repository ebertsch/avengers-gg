export interface Gear {
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