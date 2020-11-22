import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';

import { ShortUrl } from './models/short-url';

@Injectable({
  providedIn: 'root'
})
export class ShortUrlService extends EntityCollectionServiceBase<ShortUrl> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('ShortUrl', serviceElementsFactory);
  }
}
