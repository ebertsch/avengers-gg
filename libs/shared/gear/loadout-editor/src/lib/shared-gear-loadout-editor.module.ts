import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadoutBuilderComponent } from './loadout-builder/loadout-builder.component';
import { GearEditorComponent } from './gear-editor/gear-editor.component';
import { SharedUiModule } from '@avengers-game-guide/shared/ui';

@NgModule({
  imports: [CommonModule, SharedUiModule],
  declarations: [LoadoutBuilderComponent, GearEditorComponent],
  exports: [LoadoutBuilderComponent],
})
export class SharedGearLoadoutEditorModule {}
