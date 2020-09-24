import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {CdkTableModule} from '@angular/cdk/table';
import {YouTubePlayerModule} from '@angular/youtube-player';

import { SharedUiModule } from '@avengers-game-guide/shared/ui';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { GearViewComponent } from './gear-view/gear-view.component';
import { PerksViewComponent } from './perks-view/perks-view.component';
import { BuildsViewComponent } from './builds-view/builds-view.component';
import { GuidesViewComponent } from './guides-view/guides-view.component';
import { NotesViewComponent } from './notes-view/notes-view.component';
import { HeroesDataAccessModule, EnsureSelectedHeroGuard } from '@avengers-game-guide/shared/heroes/data-access';
import { NotesDataAccessModule } from '@avengers-game-guide/shared/notes/data-access';

@NgModule({
  imports: [
    CommonModule,
    CdkTableModule,
    YouTubePlayerModule,
    SharedUiModule,
    HeroesDataAccessModule,
    NotesDataAccessModule,
    RouterModule.forChild([
      {path: ':heroSlug', component: DetailPageComponent, canActivate:[EnsureSelectedHeroGuard], children: [
        { path: '', pathMatch:'full', redirectTo: 'gear' },
        { path: 'gear', component: GearViewComponent },
        { path: 'perks', component: PerksViewComponent },
        { path: 'builds', component: BuildsViewComponent },
        { path: 'guides', component: GuidesViewComponent },
        { path: 'notes', component: NotesViewComponent },
      ]}
    ]),
  ],
  declarations: [DetailPageComponent, GearViewComponent, PerksViewComponent, BuildsViewComponent, GuidesViewComponent, NotesViewComponent],
})
export class HeroesDetailModule {}
