import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, filter, first, take, switchMap, withLatestFrom, map, catchError } from 'rxjs/operators';
import { HeroService } from './hero.service';

@Injectable({
    providedIn: 'root'
})
export class EnsureHeroesGuard implements CanActivate {
  constructor(private heroes: HeroService) {}

  canActivate(): Observable<boolean> {
    return this.heroes.loaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.heroes.getAll()
        }
      }),
      filter(loaded => loaded),
      first()
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class EnsureSelectedHeroGuard implements CanActivate {
constructor(private router: Router, private heros: HeroService) {}

  waitForCollectionToLoad(): Observable<boolean> {
    return this.heros.loaded$.pipe(
      filter((loaded) => {
        return loaded
      }),
      take(1)
    );
  }

  hasHeroInState(id: string): Observable<boolean> {
    return this.heros.keys$.pipe(
      map((entities) => !!entities[id]),
      take(1)
    );
  }

  hasHeroInApi(id: string): Observable<boolean> {
    return this.heros.getByKey(id).pipe(
      map(hero => !!hero),
      catchError(() => {
        this.router.navigate(['/404']);
        return of(false)
      })
    )
  }

  hasHero(id: string): Observable<boolean> {
    return this.hasHeroInState(id).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasHeroInApi(id);
      })
    );
  }

  canActivate(): Observable<boolean> {

    return this.heros.selectedId$.pipe(
      switchMap((heroId) => this.hasHero(heroId))
    );

    // return this.waitForCollectionToLoad().pipe(
    //   switchMap(() => {
    //     return this.heros.selectedId$}),
    //   switchMap((heroId) => {
    //     return this.hasHero(heroId)})
    // );
  }
}