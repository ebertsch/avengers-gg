import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

import { GuidesPageComponent } from './pages/guides-page/guides-page.component';
import { PerksPageComponent } from './pages/perks-page/perks-page.component';
import { GearPageComponent } from './pages/gear-page/gear-page.component';
import { NotesPageComponent } from './pages/notes-page/notes-page.component';
import { NamedSetsPageComponent } from './pages/named-sets-page/named-sets-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component'

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);


@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', pathMatch: 'full', redirectTo: '/home' },
            { path: 'home', component: DashboardComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
            { path: 'gear', component: GearPageComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
            { path: 'perks', component: PerksPageComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
            { path: 'named-sets', component: NamedSetsPageComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
            { path: 'guides', component: GuidesPageComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
            { path: 'notes', component: NotesPageComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
            { path: 'login', component: LoginPageComponent },
        ], { initialNavigation: 'enabled', relativeLinkResolution: 'legacy' }),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
    constructor() { }
}