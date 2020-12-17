import { Injectable } from '@nestjs/common';
import { reduce } from 'ramda';
import { DataServiceBase } from '../../data-service-base';
import { Perk } from './perk.model';

const NUMBERS_REGEX = /\-?\d{1,}\.?\d*%?/gm


@Injectable()
export class PerkService extends DataServiceBase<Perk> {
    constructor() {
        super(Perk)
    }

    tokenizeDescription(value: string): string {
        const matches = value.match(NUMBERS_REGEX)
        let description = value
        
        if (matches) {
            description = reduce((a, c) => {
                const token = c.indexOf('%') > -1 ? '%': 'X'
                return a.replace(c, `[${token}]`)
            }, description, matches)
        }

        return description
    }

    getDescriptionTokenValues(value: string): [string, number][] {
        const matches = value.match(NUMBERS_REGEX)
        const _values = Array.from(matches || []);
        const values = _values.map(x=>[x, parseInt(x)] as [string, number]) as [string,number][]
        return values
    }
}
