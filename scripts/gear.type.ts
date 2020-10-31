import { Response, Result } from  './aw-api-response.type'

export type GearResponse = Response<Result<Item>>;

export interface Item {
    gearCategory?: string;
    character?:    string;
    rarity:        string;
    powerLevel:    number;
    stars?:        number;
    proficiency?:  number;
    valor?:        number;
    intensity?:    number;
    sources?:      string[];
    version?:      string;
    perks:         Perk[];
    might?:        number;
    resilience?:   number;
    resolve?:      number;
    precision?:    number;
    imageAlbum?:   string;
    perk3ID?:      number;
    perk2ID?:      number;
    perk1ID?:      number;
    notes?:        string;
    manufacturer?: string;
}

export interface Perk {
    name:     string;
    percent?: number;
}