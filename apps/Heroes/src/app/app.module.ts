import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http"

import { ShellModule } from '@avengers-game-guide/shared/shell';
import { HeroesDataAccessModule } from '@avengers-game-guide/shared/heroes/data-access';
import { RootStateModule } from '@avengers-game-guide/shared/root-state';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RootStateModule,
    ShellModule,
    HeroesDataAccessModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
