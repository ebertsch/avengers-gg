import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { select, createSelector } from '@ngrx/store';
import { RouteSelectors } from '@avengers-game-guide/shared/router'

import { GearDefinition } from './models/gear-definition';

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

}
