import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GearComponent } from './gear/gear.component';
import { PerkModule } from '@avengers-game-guide/shared/perks/perk'

@NgModule({
  imports: [CommonModule, PerkModule],
  declarations: [GearComponent],
  exports: [GearComponent]
})
export class GearModule {}
