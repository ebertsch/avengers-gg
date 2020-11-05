import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { select, createSelector } from '@ngrx/store';
import { RouteSelectors } from '@avengers-game-guide/shared/router'

import { GearDefinition } from './models/gear-definition';
import { filter } from 'ramda';

@Injectable({
  providedIn: 'root'
})
export class GearService extends EntityCollectionServiceBase<GearDefinition> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Gear', serviceElementsFactory);
  }

  private getSelectedDefinitionId = createSelector(
    RouteSelectors.getMergedRoute,
    (mergedRoute) => <string>mergedRoute.params.gearSlug
  );
  selectedId$ = this.store.pipe(select(this.getSelectedDefinitionId))

  private getSelectedDefinition = createSelector(
    this.selectors.selectEntityMap,
    this.getSelectedDefinitionId,
    (entities, selectedId) => <GearDefinition>(selectedId && entities[selectedId])
  );
  selected$ = this.store.pipe(select(this.getSelectedDefinition))

  private getGearForHeroSelector = (hero: string) => createSelector(
    this.selectors.selectEntities,
    gear => filter(g=> g.heroId === hero, gear).sort()
  );
  getGearForHero = (hero: string) => {
    return this.store.pipe(select(this.getGearForHeroSelector(hero)))
  }
}
