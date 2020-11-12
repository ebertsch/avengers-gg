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
  getPerk = (id: string) =>
    this.store.pipe(select(this.getPerkSelector(id)))

  private getGearSlotPerksSelector = (slot: string) => createSelector(
    this.selectors.selectEntities, perks => filter(perk => contains(slot, perk.gear), perks).sort()
  );
  getGearSlotPerks = (slot: string) =>
    this.store.pipe(select(this.getGearSlotPerksSelector(slot)))

  private getGearPerksSelector = (slot: string, hero: string) => createSelector(
    this.selectors.selectEntities,
    perks => filter(perk =>
      contains(slot, perk.gear) && (contains(hero, perk.heroes) || contains('*', perk.heroes))
      , perks).sort()
  );
  getGearPerks = (slot: string, hero: string) =>
    this.store.pipe(select(this.getGearPerksSelector(slot, hero)))
    
  private getGearPerksForHeroSelector = (hero: string) => createSelector(
    this.selectors.selectEntities,
    perks => filter(perk => contains(hero, perk.heroes), perks).sort()
  );
  getGearPerksForHero = (hero: string) =>
    this.store.pipe(select(this.getGearPerksForHeroSelector(hero)))

}
