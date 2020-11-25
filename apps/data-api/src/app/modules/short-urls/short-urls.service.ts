import { Injectable } from '@nestjs/common';
import { DataServiceBase } from '../../data-service-base';
import { ShortUrls } from './short-urls.model';

@Injectable()
export class ShortUrlsService extends DataServiceBase<ShortUrls> {
    constructor() {
        super(ShortUrls)
    }
}
