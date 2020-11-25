import { Component, OnInit, OnDestroy, OnChanges, PLATFORM_ID } from '@angular/core';
import { Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { trace } from '@angular/fire/performance';
import { Router } from '@angular/router';


@Component({
  selector: 'aggd-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy, OnChanges {
  private readonly userDisposable: Subscription | undefined;
  loginForm: FormGroup
  showLogin = false;
  showLogout = false;
  hidePassword = true;
  isUiAuthAction = false;

  constructor(public readonly afAuth: AngularFireAuth, @Inject(PLATFORM_ID) platformId: object, router: Router) {
    if (!isPlatformServer(platformId)) {
      this.userDisposable = this.afAuth.authState.pipe(
        trace('auth'),
        map(u => { return !!u})
      ).subscribe(isLoggedIn => {
        this.showLogin = !isLoggedIn;
        this.showLogout = isLoggedIn;

        if (this.isUiAuthAction && isLoggedIn) {
          router.navigate(['/'])
        }
      });
    }
  }

  ngOnInit() {
    this.setupForm()
  }

  ngOnChanges() { }

  ngOnDestroy() {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

  setupForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      rememberMe: new FormControl(false)
    })

    this.loginForm.get('rememberMe').valueChanges.subscribe(value => {
      if (value) this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      else this.afAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
    })
  }

  async login() {
    this.isUiAuthAction = true
    const user = await this.afAuth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
  }

  async logout() {
    await this.afAuth.signOut()
  }
}
