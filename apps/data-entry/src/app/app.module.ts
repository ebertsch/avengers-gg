import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"
import { DefaultDataServiceConfig } from '@ngrx/data';
import { SharedUiModule } from '@avengers-game-guide/shared/ui'
import { StorageModule } from '@ngx-pwa/local-storage';

import { environment } from '@avengers-game-guide/shared/environments';
import { RootStateModule } from '@avengers-game-guide/shared/root-state';
import { SharedPerksPerkSelectModule } from '@avengers-game-guide/shared/perks/perk-select'
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
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component'

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './auth.interceptor'


@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    StorageModule,
    RootStateModule,
    DataAccessModule,
    SharedUiModule,
    SharedPerksPerkSelectModule
  ],
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
    DataFiltersComponent,
    LoginPageComponent,
    DashboardComponent
  ],
  providers: [
    { provide: DefaultDataServiceConfig, useValue: { root: environment.dataEntryClientApiUrl } },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    firebase.initializeApp(environment.firebaseConfig)
  }
}