import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadoutBuilderComponent } from './loadout-builder/loadout-builder.component';
import { GearInstanceEditorComponent } from './gear-instance-editor/gear-instance-editor.component';
import { SharedUiModule } from '@avengers-game-guide/shared/ui';
import { GearInstanceViewerComponent } from './gear-instance-viewer/gear-instance-viewer.component';
import { LoadoutSummaryComponent } from './loadout-summary/loadout-summary.component';

@NgModule({
  imports: [CommonModule, SharedUiModule, FormsModule, ReactiveFormsModule],
  declarations: [LoadoutBuilderComponent, GearInstanceEditorComponent, GearInstanceViewerComponent, LoadoutSummaryComponent],
  exports: [LoadoutBuilderComponent],
})
export class SharedGearLoadoutEditorModule {}
