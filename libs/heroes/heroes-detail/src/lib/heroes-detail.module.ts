import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {CdkTableModule} from '@angular/cdk/table';
import { ClipboardModule } from '@angular/cdk/clipboard'
import {YouTubePlayerModule} from '@angular/youtube-player';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';

import { SharedUiModule } from '@avengers-game-guide/shared/ui';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { GearViewComponent } from './gear-view/gear-view.component';
import { PerksViewComponent } from './perks-view/perks-view.component';
import { BuildsViewComponent } from './builds-view/builds-view.component';
import { GuidesViewComponent } from './guides-view/guides-view.component';
import { NotesViewComponent } from './notes-view/notes-view.component';
import { DataAccessModule as HeroesDataAccessModule, EnsureSelectedHeroGuard } from '@avengers-game-guide/shared/heroes/data-access';
import { NotesDataAccessModule } from '@avengers-game-guide/shared/notes/data-access';
import { DataAccessModule as NamedSetsDataAccessModule } from '@avengers-game-guide/shared/named-sets/data-access';
import { GearModule } from '@avengers-game-guide/shared/gear/gear';
import { SharedGearLoadoutEditorModule } from '@avengers-game-guide/shared/gear/loadout-editor';
import { DataAccessModule as SkillsDataAccessModule } from '@avengers-game-guide/shared/skills/data-access';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  navigation: true,
  slidesPerView: 1,
  pagination: {
    clickable: true,
    type: 'bullets',
    el: '.swiper-pagination'
  }
};

@NgModule({
  imports: [
    CommonModule,
    CdkTableModule,
    ClipboardModule,
    YouTubePlayerModule,
    SwiperModule,
    SharedUiModule,
    MatButtonToggleModule,
    MatIconModule,
    GearModule,
    SharedGearLoadoutEditorModule,
    HeroesDataAccessModule,
    NotesDataAccessModule,
    SkillsDataAccessModule,
    NamedSetsDataAccessModule,
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
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  declarations: [DetailPageComponent, GearViewComponent, PerksViewComponent, BuildsViewComponent, GuidesViewComponent, NotesViewComponent],
})
export class HeroesDetailModule {}
