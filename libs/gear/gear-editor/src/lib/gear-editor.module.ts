import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { GearEditorPageComponent } from './gear-editor-page/gear-editor-page.component';

export const gearGearEditorRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'editor' },
      { path: 'editor', pathMatch: 'full', component: GearEditorPageComponent }
    ])
  ],
  declarations: [GearEditorPageComponent],
  exports: [RouterModule]
})
export class GearEditorModule {}
