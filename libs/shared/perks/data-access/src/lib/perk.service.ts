import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';

import { Perk } from './perk';

@Injectable({
  providedIn: 'root'
})
export class PerkService extends EntityCollectionServiceBase<Perk> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Perk', serviceElementsFactory);
  }
}
