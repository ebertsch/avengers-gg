import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent, PanelHeaderComponent } from './panel/panel.component';
import { HighlightPipe } from './highlight/highlight.pipe';
import { NameDescriptionComponent } from './name-description/name-description.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PanelComponent, PanelHeaderComponent, HighlightPipe, NameDescriptionComponent],
  exports: [PanelComponent, PanelHeaderComponent, HighlightPipe, NameDescriptionComponent],
})
export class SharedUiModule {}
