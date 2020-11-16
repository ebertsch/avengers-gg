import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';

import { NamedSet } from './models/named-set';

@Injectable({
  providedIn: 'root'
})
export class NamedSetService extends EntityCollectionServiceBase<NamedSet> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('NamedSet', serviceElementsFactory);
  }
}
