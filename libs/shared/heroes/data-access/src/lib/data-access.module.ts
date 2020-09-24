import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
// import { DataPersistence } from '@nrwl/angular'
// import { HeroService } from './hero.service';

@NgModule({
  imports: [
    CommonModule,
    // StoreModule.forFeature(fromHeroes.HEROES_FEATURE_KEY, fromHeroes.reducer),
    // EffectsModule.forFeature([HeroesEffects]),
  ],
  providers: [],
})
export class HeroesDataAccessModule {}
