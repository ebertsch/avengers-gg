import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IndexPageComponent } from './index-page/index-page.component';
import { SharedUiModule } from '@avengers-game-guide/shared/ui'

@NgModule({
  imports: [
    CommonModule,
    SharedUiModule,
    RouterModule.forChild([
      { path: '', component: IndexPageComponent, loadChildren: () =>
        import('@avengers-game-guide/gear/gear-editor').then((module) => module.GearEditorModule),
      },

    ]),
  ],
  declarations: [IndexPageComponent],
  exports: [IndexPageComponent],
})
export class GearIndexModule {}
