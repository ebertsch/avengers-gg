import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {CdkTableModule} from '@angular/cdk/table';
import { ClipboardModule } from '@angular/cdk/clipboard'
import {YouTubePlayerModule} from '@angular/youtube-player';
import { SwiperModule } from 'ngx-swiper-wrapper';

import { SharedUiModule } from '@avengers-game-guide/shared/ui';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { GearViewComponent } from './gear-view/gear-view.component';
import { PerksViewComponent } from './perks-view/perks-view.component';
import { BuildsViewComponent } from './builds-view/builds-view.component';
import { GuidesViewComponent } from './guides-view/guides-view.component';
import { NotesViewComponent } from './notes-view/notes-view.component';
import { HeroesDataAccessModule, EnsureSelectedHeroGuard } from '@avengers-game-guide/shared/heroes/data-access';
import { NotesDataAccessModule } from '@avengers-game-guide/shared/notes/data-access';
import { GearModule } from '@avengers-game-guide/shared/gear/gear';
import { SharedGearLoadoutEditorModule } from '@avengers-game-guide/shared/gear/loadout-editor';
import { DataAccessModule as SkillsDataAccessModule } from '@avengers-game-guide/shared/skills/data-access';


@NgModule({
  imports: [
    CommonModule,
    CdkTableModule,
    ClipboardModule,
    YouTubePlayerModule,
    SwiperModule,
    SharedUiModule,
    GearModule,
    SharedGearLoadoutEditorModule,
    HeroesDataAccessModule,
    NotesDataAccessModule,
    SkillsDataAccessModule,
    
    RouterModule.forChild([
      {path: ':heroSlug', component: DetailPageComponent, canActivate:[EnsureSelectedHeroGuard], children: [
        { path: '', pathMatch:'full', redirectTo: 'builder' },
        { path: 'gear', component: GearViewComponent },
        { path: 'perks', component: PerksViewComponent },
        { path: 'builder', component: BuildsViewComponent },
        { path: 'guides', component: GuidesViewComponent },
        { path: 'notes', component: NotesViewComponent },
      ]}
    ]),
  ],
  declarations: [DetailPageComponent, GearViewComponent, PerksViewComponent, BuildsViewComponent, GuidesViewComponent, NotesViewComponent],
})
export class HeroesDetailModule {}
