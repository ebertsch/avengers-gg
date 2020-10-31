import { Response, Result } from  './aw-api-response.type'

export type ItemSetResponse = Response<Result<NamedItemSet>>;

export interface NamedItemSet {
    rarity:      string;
    character:   string;
    items:       string[];
    sources:     string[];
    incomplete?: boolean;
}

