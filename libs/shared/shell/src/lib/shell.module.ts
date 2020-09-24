import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell/shell.component';
import { RouterModule } from '@angular/router';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { SharedUiModule } from '@avengers-game-guide/shared/ui';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

@NgModule({
  imports: [CommonModule, RouterModule, SharedUiModule],
  declarations: [ShellComponent, NavigationBarComponent, NotFoundPageComponent],
  exports: [ShellComponent],
})
export class ShellModule {}
