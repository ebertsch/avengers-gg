import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EntityDataModule } from '@ngrx/data';

import { environment } from '@avengers-game-guide/shared/environments';
import { RouterStoreModule } from '@avengers-game-guide/shared/router'
import { entityConfig } from './app-entity-metadata';

@NgModule({
  imports: [
    StoreModule.forRoot(
      {
        router: routerReducer,
      },
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    RouterStoreModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
})
export class RootStateModule {}
