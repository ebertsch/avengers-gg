import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerkComponent } from './perk/perk.component';
import {SharedUiModule} from '@avengers-game-guide/shared/ui'

@NgModule({
  imports: [CommonModule, SharedUiModule],
  declarations: [PerkComponent],
  exports: [PerkComponent],
})
export class PerkModule {}
