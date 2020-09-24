import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';

import { Guide } from './guide';

@Injectable({
  providedIn: 'root'
})
export class GuideService extends EntityCollectionServiceBase<Guide> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Guide', serviceElementsFactory);
  }
}
