import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { PanelComponent, PanelHeaderComponent } from './panel/panel.component';
import { HighlightPipe } from './pipes/highlight.pipe';
import { SortByPipe } from './pipes/sort.pipe';
import { NameDescriptionComponent } from './name-description/name-description.component';
import { FlaredTitleComponent } from './flared-title/flared-title.component';
import { NavigationTabsComponent, NavigationTabComponent } from './navigation-tabs/navigation-tabs.component';
import { FancyTextComponent } from './fancy-text/fancy-text.component';
import { DropdownComponent } from './dropdown/dropdown.component';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, ScrollingModule],
  declarations: [PanelComponent, PanelHeaderComponent, HighlightPipe, SortByPipe, NameDescriptionComponent, FlaredTitleComponent, NavigationTabsComponent, NavigationTabComponent, FancyTextComponent, DropdownComponent],
  exports: [PanelComponent, PanelHeaderComponent, HighlightPipe, SortByPipe, NameDescriptionComponent, FlaredTitleComponent, NavigationTabsComponent, NavigationTabComponent, FancyTextComponent, DropdownComponent],
})
export class SharedUiModule {}
