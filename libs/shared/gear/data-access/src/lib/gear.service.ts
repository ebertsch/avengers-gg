import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { select, createSelector } from '@ngrx/store';
import { RouteSelectors } from '@avengers-game-guide/shared/router'

import { Gear } from './gear';

@Injectable({
  providedIn: 'root'
})
export class GearService extends EntityCollectionServiceBase<Gear> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Gear', serviceElementsFactory);
  }

  private getSelectedId = createSelector(
    RouteSelectors.getMergedRoute,
    (mergedRoute) => <string>mergedRoute.params.gearSlug
);

selectedId$ = this.store.pipe(select(this.getSelectedId))

private getSelected = createSelector(
    this.selectors.selectEntityMap,
    this.getSelectedId,
    (entities, selectedId) => <Gear>(selectedId && entities[selectedId])
);

selected$ = this.store.pipe(select(this.getSelected))

}
