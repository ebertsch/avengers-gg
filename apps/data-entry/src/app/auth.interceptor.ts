import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { from } from 'rxjs'
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public readonly afAuth: AngularFireAuth) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return from(this.afAuth.currentUser).pipe(
      mergeMap(user => {
        if(req.headers.get('skip-auth')=="true") return next.handle(req)
        if (!!user) {
          return from(user.getIdToken()).pipe(
            mergeMap(jwt => {
              const authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${jwt}`)
              });

              return next.handle(authReq);
            })
          )
        } else {
          return next.handle(req);
        }
      })
    )
  }
}