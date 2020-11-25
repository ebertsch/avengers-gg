import { Injectable } from '@nestjs/common';
import { DataServiceBase } from '../../data-service-base';
import { Builds } from './builds.model';

@Injectable()
export class BuildsService extends DataServiceBase<Builds> {
    constructor() {
        super(Builds)
    }
}
