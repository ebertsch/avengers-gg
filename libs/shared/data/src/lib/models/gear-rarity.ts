export type GearRarityValue = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'exotic'

export interface GearRarity {
    id: GearRarityValue
    title: string
    modifier2: number,
    modifier3: number,
}

export const GEAR_RARITIES: GearRarity[] = [
    { id: 'exotic', title: 'Exotic', modifier2: 0.470, modifier3: 0.325},
    { id: 'legendary', title: 'Legendary', modifier2: 0.430, modifier3: 0.31},
    { id: 'epic', title: 'Epic', modifier2: 0.399, modifier3: 0.250},
    { id: 'rare', title: 'Rare', modifier2: 0.358, modifier3: 0.220},
    { id: 'uncommon', title: 'Uncommon', modifier2: 0.325, modifier3: 0.180},
    { id: 'common', title: 'Common', modifier2: 0.290, modifier3:  0.145},
]