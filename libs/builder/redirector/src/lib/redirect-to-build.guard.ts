import { CanActivate, Router } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { BuildService } from '@avengers-game-guide/shared/builds/data-access';
import { ShortUrlService } from '@avengers-game-guide/shared/urls/shortener';

@Injectable({
  providedIn: 'root'
})
export class RedirectToBuildGuard implements CanActivate {
  constructor(@Inject(DOCUMENT) private document: Document, private router: Router, private buildService: BuildService, private shortUrlService: ShortUrlService) { }

  hasBuildInApi(id: string): Observable<boolean> {
    return this.shortUrlService.getByKey(id).pipe(
      map(shortUrl => {
        this.document.location.href = shortUrl.url
        return true
      }),
      catchError(() => {
        this.router.navigate(['/404']);
        return of(false)
      })
    )
  }

  canActivate(): Observable<boolean> {
    return this.buildService.buildIdQueryParam$.pipe(
      switchMap((heroId) => this.hasBuildInApi(heroId))
    );
  }
}