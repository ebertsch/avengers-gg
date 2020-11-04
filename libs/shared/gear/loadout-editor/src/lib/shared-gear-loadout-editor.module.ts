import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadoutBuilderComponent } from './loadout-builder/loadout-builder.component';
import { GearInstanceEditorComponent } from './gear-instance-editor/gear-instance-editor.component';
import { SharedUiModule } from '@avengers-game-guide/shared/ui';

@NgModule({
  imports: [CommonModule, SharedUiModule, FormsModule, ReactiveFormsModule],
  declarations: [LoadoutBuilderComponent, GearInstanceEditorComponent],
  exports: [LoadoutBuilderComponent],
})
export class SharedGearLoadoutEditorModule {}
