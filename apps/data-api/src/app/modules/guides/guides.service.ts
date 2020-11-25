import { Injectable } from '@nestjs/common';
import { DataServiceBase } from '../../data-service-base';
import { Guides } from './guides.model';

@Injectable()
export class GuidesService extends DataServiceBase<Guides> {
    constructor() {
        super(Guides)
    }
}
