import {createFeatureSelector, createSelector} from '@ngrx/store';
import {routerStateConfig} from './shared-router.module';
import {MergedRouteReducerState} from './merged-route-reducer-state';

export const getRouterReducerState = createFeatureSelector<MergedRouteReducerState>(routerStateConfig.stateKey);
export const getMergedRoute = createSelector(getRouterReducerState, (routerReducerState) => routerReducerState.state);