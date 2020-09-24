import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent, PanelHeaderComponent } from './panel/panel.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PanelComponent, PanelHeaderComponent],
  exports: [PanelComponent, PanelHeaderComponent]
})
export class SharedUiModule {}
