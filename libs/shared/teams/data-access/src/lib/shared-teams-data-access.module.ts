import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageModule } from '@ngx-pwa/local-storage';


@NgModule({
  imports: [
    CommonModule,
    StorageModule
  ],
})
export class DataAccessModule {}
