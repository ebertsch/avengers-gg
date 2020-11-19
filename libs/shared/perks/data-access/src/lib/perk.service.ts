import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { select, createSelector } from '@ngrx/store';
import { contains, filter } from 'ramda';
import { Perk } from './perk';
import { GearSlot } from '@avengers-game-guide/shared/data';

const convertToGearSlotType = (gearSlot: GearSlot | string): string => {
  switch (gearSlot) {
    case 'minorArtifact1':
    case 'minorArtifact2':
      return 'minorArtifact';
    default:
      return gearSlot;
      break
  }
}

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
    this.selectors.selectEntities, perks => filter(perk => contains(convertToGearSlotType(slot), perk.gear || []), perks || []).sort()
  );
  getGearSlotPerks = (slot: string) =>
    this.store.pipe(select(this.getGearSlotPerksSelector(convertToGearSlotType(slot))))

  private getGearPerksSelector = (slot: string, hero: string) => createSelector(
    this.selectors.selectEntities,
    perks => {
      return filter(perk => {
        const sameSlot = contains(convertToGearSlotType(slot), perk.gear || [])
        const sameHero = contains(hero, perk.heroes || [])
        const isAnyHero = contains('*', perk.heroes || [])
        return sameSlot && (sameHero || isAnyHero)
      }, perks || []).sort()
    }
  );
  getGearPerks = (slot: string, hero: string) =>
    this.store.pipe(select(this.getGearPerksSelector(convertToGearSlotType(slot), hero)))

  private getGearPerksForHeroSelector = (hero: string) => createSelector(
    this.selectors.selectEntities,
    perks => filter(perk => contains(hero, perk.heroes || []), perks).sort()
  );
  getGearPerksForHero = (hero: string) =>
    this.store.pipe(select(this.getGearPerksForHeroSelector(hero)))

}
