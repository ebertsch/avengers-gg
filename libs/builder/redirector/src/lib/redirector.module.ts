import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RedirectToBuildGuard } from './redirect-to-build.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: ':code', canActivate: [RedirectToBuildGuard] }
    ]),
  ],
})
export class RedirectorModule { }
