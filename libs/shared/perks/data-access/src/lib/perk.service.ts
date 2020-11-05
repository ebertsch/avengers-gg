import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { select, createSelector } from '@ngrx/store';
import { contains, filter } from 'ramda';

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
    return this.store.pipe(select(this.getPerkSelector(id)))
  }

  private getGearPerksSelector = (slot: string, hero: string) => createSelector(
    this.selectors.selectEntities,
    perks => filter(perk=> contains(slot, perk.gear) && (perk.heroId === hero || perk.heroId === '*') ,perks).sort()
  );
  getGearPerks = (slot: string, hero: string) => {
    return this.store.pipe(select(this.getGearPerksSelector(slot, hero)))
  }
}
