import { Injectable } from '@nestjs/common';

import { DataServiceBase } from '../../data-service-base';
import { Hero } from './hero.model';

@Injectable()
export class HeroService extends DataServiceBase<Hero> {
    constructor() {
        super(Hero)
    }
}
