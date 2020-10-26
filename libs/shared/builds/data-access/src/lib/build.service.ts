import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { createSelector, select } from '@ngrx/store';
import { RouteSelectors } from '@avengers-game-guide/shared/router'


import { Build } from './build';

@Injectable({
  providedIn: 'root'
})
export class BuildService extends EntityCollectionServiceBase<Build> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Build', serviceElementsFactory);
  }

  private getSelectedSkills = createSelector(
    RouteSelectors.getMergedRoute,
    (mergedRoute) => <string>mergedRoute.queryParams.skills
);

  selectedSkills$ = this.store.pipe(select(this.getSelectedSkills))
}
