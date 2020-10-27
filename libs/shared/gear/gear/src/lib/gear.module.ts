import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GearComponent } from './gear/gear.component';
import { PerkModule } from '@avengers-game-guide/shared/perks/perk'
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SharedUiModule } from '@avengers-game-guide/shared/ui';

@NgModule({
  imports: [CommonModule, PerkModule, SwiperModule, SharedUiModule],
  declarations: [GearComponent],
  exports: [GearComponent]
})
export class GearModule {}
