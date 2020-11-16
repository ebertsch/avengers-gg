import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http"
import { DefaultDataServiceConfig } from '@ngrx/data';
import { SharedUiModule } from '@avengers-game-guide/shared/ui'
import { StorageModule } from '@ngx-pwa/local-storage';

import { environment } from '@avengers-game-guide/shared/environments';
import { RootStateModule } from '@avengers-game-guide/shared/root-state';
import { MaterialModule } from './material.module';
import { DataAccessModule } from './data-access.module';
import { AppComponent } from './app.component';
import { GuidesPageComponent } from './pages/guides-page/guides-page.component';
import { PerksPageComponent } from './pages/perks-page/perks-page.component';
import { GearPageComponent } from './pages/gear-page/gear-page.component';
import { NotesPageComponent } from './pages/notes-page/notes-page.component';
import { NamedSetsPageComponent } from './pages/named-sets-page/named-sets-page.component';
import { NamedSetEditFormComponent } from './form-views/named-set-edit-form/named-set-edit-form.component';
import { PerksEditFormComponent } from './form-views/perks-edit-form/perks-edit-form.component';
import { GearEditFormComponent } from './form-views/gear-edit-form/gear-edit-form.component';
import { GuideEditFormComponent } from './form-views/guide-edit-form/guide-edit-form.component';
import { NoteEditFormComponent } from './form-views/note-edit-form/note-edit-form.component';
import { DataFiltersComponent } from './data-filters/data-filters.component';

@NgModule({
  declarations: [
    AppComponent,
    PerksPageComponent,
    GearPageComponent,
    NamedSetsPageComponent,
    GuidesPageComponent,
    NotesPageComponent,
    NamedSetEditFormComponent,
    PerksEditFormComponent,
    GearEditFormComponent,
    GuideEditFormComponent,
    NoteEditFormComponent,
    DataFiltersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    StorageModule,
    RootStateModule,
    DataAccessModule,
    SharedUiModule,
    RouterModule.forRoot([
      { path: 'gear', component: GearPageComponent },
      { path: 'perks', component: PerksPageComponent },
      { path: 'named-sets', component: NamedSetsPageComponent },
      { path: 'guides', component: GuidesPageComponent },
      { path: 'notes', component: NotesPageComponent },
    ], { initialNavigation: 'enabled' }),

  ],
  providers: [{ provide: DefaultDataServiceConfig, useValue: { root: environment.dataEntryClientApiUrl } }],
  bootstrap: [AppComponent],
})
export class AppModule { }