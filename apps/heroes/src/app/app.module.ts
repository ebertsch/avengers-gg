import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http"
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';

import { environment } from '@avengers-game-guide/shared/environments'
import { ShellModule } from '@avengers-game-guide/shared/shell';
import { DataAccessModule as HeroesDataAccessModule } from '@avengers-game-guide/shared/heroes/data-access';
import { RootStateModule } from '@avengers-game-guide/shared/root-state';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    environment.production && !environment.isServer ? NgxGoogleAnalyticsModule.forRoot(environment.googleAnalyticsCode) : [],
    environment.production && !environment.isServer ? NgxGoogleAnalyticsRouterModule : [],
    HttpClientModule,
    AppRoutingModule,
    RootStateModule,
    ShellModule,
    HeroesDataAccessModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
