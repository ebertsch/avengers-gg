import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent, PanelHeaderComponent } from './panel/panel.component';
import { HighlightPipe } from './highlight/highlight.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [PanelComponent, PanelHeaderComponent, HighlightPipe],
  exports: [PanelComponent, PanelHeaderComponent, HighlightPipe],
})
export class SharedUiModule {}
