import { Inject, Injectable } from '@angular/core';
import {
  DefaultDataServiceConfig,
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { select, createSelector } from '@ngrx/store';

import { RouteSelectors } from '@avengers-game-guide/shared/router'
import { GearSlot, convertToGearSlotType } from '@avengers-game-guide/shared/data'
import { GearDefinition } from './models/gear-definition';
import { filter } from 'ramda';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GearService extends EntityCollectionServiceBase<GearDefinition> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory, private http: HttpClient, private config: DefaultDataServiceConfig) {
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

  private getGearDefinitionSelector = (id: string) => createSelector(
    this.selectors.selectEntityMap,
    gear => gear[id]
  );
  getGearDefinition = (id: string) => {
    return this.store.pipe(select(this.getGearDefinitionSelector(id)))
  }

  private getGearForHeroSelector = (gearSlot: string, hero: string) => createSelector(
    this.selectors.selectEntities,
    gear => filter(g => (g.heroId === hero || g.heroId === '*') && g.gearType === convertToGearSlotType(gearSlot), gear).sort()
  );
  getGearForHero = (gearSlot: string, hero: string) => {
    return this.store.pipe(select(this.getGearForHeroSelector(gearSlot, hero)))
  }

  indexGear() {
    this.http.post(`${this.config.root}/gear/index`, null).subscribe(()=>{})
  }
}
