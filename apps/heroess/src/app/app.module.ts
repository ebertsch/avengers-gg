import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http"
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';

import { environment } from '@avengers-game-guide/shared/environments'
import { ShellModule } from '@avengers-game-guide/shared/shell';
import { HeroesDataAccessModule } from '@avengers-game-guide/shared/heroes/data-access';
import { RootStateModule } from '@avengers-game-guide/shared/root-state';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 1,
  freeMode: true,
  // spaceBetween: 100,
  pagination: {
    clickable: true
  }
};
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    environment.production ? NgxGoogleAnalyticsModule.forRoot(environment.googleAnalyticsCode) : [],
    environment.production ? NgxGoogleAnalyticsRouterModule : [],
    HttpClientModule,
    AppRoutingModule,
    RootStateModule,
    ShellModule,
    SwiperModule,
    HeroesDataAccessModule,
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
