import { Injectable } from '@nestjs/common';
import { DataServiceBase } from '../../data-service-base';
import { Perk } from './perk.model';

@Injectable()
export class PerkService extends DataServiceBase<Perk> {
    constructor() {
        super(Perk)
    }
}
