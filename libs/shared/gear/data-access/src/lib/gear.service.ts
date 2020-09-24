import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';

import { Gear } from './gear';

@Injectable({
  providedIn: 'root'
})
export class GearService extends EntityCollectionServiceBase<Gear> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Gear', serviceElementsFactory);
  }
}
