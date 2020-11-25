import { Injectable } from '@nestjs/common';
import { DataServiceBase } from '../../data-service-base';
import { NamedSets } from './named-sets.model';

@Injectable()
export class NamedSetsService extends DataServiceBase<NamedSets> {
    constructor() {
        super(NamedSets)
    }
}
