import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PanelComponent, PanelHeaderComponent } from './panel/panel.component';
import { HighlightPipe } from './highlight/highlight.pipe';
import { NameDescriptionComponent } from './name-description/name-description.component';
import { FlaredTitleComponent } from './flared-title/flared-title.component';
import { NavigationTabsComponent, NavigationTabComponent } from './navigation-tabs/navigation-tabs.component';
import { FancyTextComponent } from './fancy-text/fancy-text.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [PanelComponent, PanelHeaderComponent, HighlightPipe, NameDescriptionComponent, FlaredTitleComponent, NavigationTabsComponent, NavigationTabComponent, FancyTextComponent],
  exports: [PanelComponent, PanelHeaderComponent, HighlightPipe, NameDescriptionComponent, FlaredTitleComponent, NavigationTabsComponent, NavigationTabComponent, FancyTextComponent],
})
export class SharedUiModule {}
