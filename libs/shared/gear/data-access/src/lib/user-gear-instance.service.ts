import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { UserGearInstance } from './models/user-gear-instance';

@Injectable({
  providedIn: 'root'
})
export class UserGearInstanceService extends EntityCollectionServiceBase<UserGearInstance> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('PerkUsage', serviceElementsFactory);
  }
}
