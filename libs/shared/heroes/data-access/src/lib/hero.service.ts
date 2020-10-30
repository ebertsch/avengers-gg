import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { select, createSelector } from '@ngrx/store';
import { RouteSelectors } from '@avengers-game-guide/shared/router'

import { Hero } from './hero';
import { distinctUntilChanged } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class HeroService extends EntityCollectionServiceBase<Hero> {
    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Hero', serviceElementsFactory);
    }

    private getSelectedId = createSelector(
        RouteSelectors.getMergedRoute,
        (mergedRoute) => <string>mergedRoute.params.heroSlug
    );

    selectedId$ = this.store.pipe(select(this.getSelectedId))

    private getSelected = createSelector(
        this.selectors.selectEntityMap,
        this.getSelectedId,
        (entities, selectedId) => <Hero>(selectedId && entities[selectedId])
    );

    selected$ = this.store.pipe(select(this.getSelected))
}
