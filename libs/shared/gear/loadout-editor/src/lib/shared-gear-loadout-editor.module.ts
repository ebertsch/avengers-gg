import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadoutBuilderComponent } from './loadout-builder/loadout-builder.component';
import { GearInstanceEditorComponent } from './gear-instance-editor/gear-instance-editor.component';
import { SharedUiModule } from '@avengers-game-guide/shared/ui';
import { GearInstanceViewerComponent } from './gear-instance-viewer/gear-instance-viewer.component';
import { LoadoutSummaryComponent } from './loadout-summary/loadout-summary.component';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { SharedGearGearViewerModule } from '@avengers-game-guide/shared/gear/gear-viewer'
import { SharedPerksPerkSelectModule } from '@avengers-game-guide/shared/perks/perk-select'

@NgModule({
  imports: [
    CommonModule,
    SharedUiModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    SharedGearGearViewerModule,
    SharedPerksPerkSelectModule
  ],
  declarations: [LoadoutBuilderComponent, GearInstanceEditorComponent, GearInstanceViewerComponent, LoadoutSummaryComponent],
  exports: [LoadoutBuilderComponent],
})
export class SharedGearLoadoutEditorModule {}
