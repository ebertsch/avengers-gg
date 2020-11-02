import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { GearBuilderPageComponent } from './gear-builder-page/gear-builder-page.component';

export const gearGearEditorRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'builder' },
      { path: 'builder', pathMatch: 'full', component: GearBuilderPageComponent }
    ])
  ],
  declarations: [GearBuilderPageComponent],
  exports: [RouterModule]
})
export class GearBuilderModule {}
