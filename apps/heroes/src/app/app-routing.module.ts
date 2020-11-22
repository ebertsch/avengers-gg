import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NotFoundPageComponent } from '@avengers-game-guide/shared/shell';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'heroes',
  },
  {
    path: 'b',
    loadChildren: () =>
    import('@avengers-game-guide/builds/redirector').then(
      (module) => module.RedirectorModule
    ),
  },
  {
    path: 'heroes',
    loadChildren: () =>
      import('@avengers-game-guide/heroes/heroes-index').then(
        (module) => module.HeroesIndexModule
      ),
  },
  { path: '404', component: NotFoundPageComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
