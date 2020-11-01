import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { GearEditorPageComponent } from './gear-editor-page/gear-editor-page.component';

export const gearGearEditorRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild([
      { path: '', component: GearEditorPageComponent }
    ])
  ],
  declarations: [GearEditorPageComponent],
})
export class GearEditorModule {}
