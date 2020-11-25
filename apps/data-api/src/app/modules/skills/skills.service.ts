import { Injectable } from '@nestjs/common';
import { DataServiceBase } from '../../data-service-base';
import { Skills } from './skills.model';

@Injectable()
export class SkillsService extends DataServiceBase<Skills> {
    constructor() {
        super(Skills)
    }
}
