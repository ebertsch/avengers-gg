import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerkComponent } from './perk/perk.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PerkComponent],
  exports: [PerkComponent],
})
export class PerkModule {}
