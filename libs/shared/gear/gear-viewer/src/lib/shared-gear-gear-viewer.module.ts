import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GearViewerComponent } from './gear-viewer/gear-viewer.component';
import { GearViewerActionComponent } from './gear-viewer-action/gear-viewer-action.component';
import { SharedUiModule } from '@avengers-game-guide/shared/ui';
import { SwiperModule } from 'ngx-swiper-wrapper';

@NgModule({
  imports: [CommonModule, SharedUiModule, SwiperModule],
  declarations: [GearViewerComponent, GearViewerActionComponent],
  exports: [GearViewerComponent, GearViewerActionComponent],
})
export class SharedGearGearViewerModule {}
