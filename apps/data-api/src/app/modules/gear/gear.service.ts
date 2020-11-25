import { Injectable } from '@nestjs/common';
import { DataServiceBase } from '../../data-service-base';
import { Gear } from './gear.model';

@Injectable()
export class GearService extends DataServiceBase<Gear> {
    constructor() {
        super(Gear)
    }
}
