import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IndexPageComponent } from './index-page/index-page.component';
import { HeroNavigationComponent } from './hero-navigation/hero-navigation.component';
import { SharedUiModule } from '@avengers-game-guide/shared/ui';
import { HeroesDataAccessModule, EnsureHeroesGuard } from '@avengers-game-guide/shared/heroes/data-access';

@NgModule({
  imports: [
    CommonModule,
    SharedUiModule,
    HeroesDataAccessModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full',
      canActivate: [EnsureHeroesGuard], //todo: Move into Heroes module
      component: IndexPageComponent},
      {
        path: '',
        loadChildren: () =>
          import('@avengers-game-guide/heroes/heroes-detail').then(
            (module) => module.HeroesDetailModule
          ),
      },
    ]),
  ],
  declarations: [IndexPageComponent, HeroNavigationComponent],
  exports: [IndexPageComponent],
})
export class HeroesIndexModule {}
