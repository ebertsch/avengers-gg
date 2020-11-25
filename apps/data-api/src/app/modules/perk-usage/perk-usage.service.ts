import { Injectable } from '@nestjs/common';
import { DataServiceBase } from '../../data-service-base';
import { PerkUsage } from './perk-usage.model';

@Injectable()
export class PerkUsageService extends DataServiceBase<PerkUsage> {
    constructor() {
        super(PerkUsage)
    }
}
