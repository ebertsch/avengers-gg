import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';

import { Build } from './build';

@Injectable({
  providedIn: 'root'
})
export class BuildService extends EntityCollectionServiceBase<Build> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Build', serviceElementsFactory);
  }
}
