import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadoutBuilderComponent } from './loadout-builder/loadout-builder.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LoadoutBuilderComponent],
  exports: [LoadoutBuilderComponent],
})
export class SharedGearLoadoutEditorModule {}
