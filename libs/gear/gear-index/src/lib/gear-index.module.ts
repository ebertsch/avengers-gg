import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IndexPageComponent } from './index-page/index-page.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: IndexPageComponent },
      {
        path: 'editor',
        loadChildren: () =>
          import('@avengers-game-guide/gear/gear-editor').then(
            (module) => module.GearEditorModule
          ),
      },
    ]),
  ],
  declarations: [IndexPageComponent],
  exports: [IndexPageComponent],
})
export class GearIndexModule {}
