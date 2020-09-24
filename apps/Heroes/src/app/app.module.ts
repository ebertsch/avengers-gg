import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http"

import { ShellModule } from '@avengers-game-guide/shared/shell';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeroesDataAccessModule } from '@avengers-game-guide/shared/heroes/data-access';
import { AppStateModule } from './app-state.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ShellModule,
    AppStateModule,
    HeroesDataAccessModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
