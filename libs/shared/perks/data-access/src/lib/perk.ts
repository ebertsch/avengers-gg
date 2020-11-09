export interface Perk {
    id: string;
    title: string;
    description: string;
    gear: string[];
    heroes: string[];
    gearSpecific: boolean;
    slot1Enabled: boolean;
    slot2Enabled: boolean;
    slot3Enabled: boolean;
}