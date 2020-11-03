import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundPageComponent } from '@avengers-game-guide/shared/shell';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'heroes',
  },
  {
    path: 'heroes',
    loadChildren: () =>
      import('@avengers-game-guide/heroes/heroes-index').then(
        (module) => module.HeroesIndexModule
      ),
  },
  {
    path: 'gear',
    loadChildren: () =>
      import('@avengers-game-guide/gear/gear-index').then(
        (module) => module.GearIndexModule
      ),
  },
  { path: '404', component: NotFoundPageComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
