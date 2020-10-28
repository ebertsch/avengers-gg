import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';

import { environment } from '@avengers-game-guide/shared/environments';
import { RouterStoreModule } from '@avengers-game-guide/shared/router'
import { entityConfig } from './app-entity-metadata';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.clientApiUrl,
  timeout: 3000, // request timeout
}

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
  providers: [{ provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }]
})
export class RootStateModule {}
