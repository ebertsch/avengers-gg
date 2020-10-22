import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { select, createSelector } from '@ngrx/store';


import { Perk } from './perk';

@Injectable({
  providedIn: 'root'
})
export class PerkService extends EntityCollectionServiceBase<Perk> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Perk', serviceElementsFactory);
  }

  private getPerkSelector = (id: string) => createSelector(
    this.selectors.selectEntityMap,
    perks => perks[id]
  );
  getPerk = (id: string) =>  {
    return  this.store.pipe(select(this.getPerkSelector(id)))
  }

}
