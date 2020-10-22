import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, filter, first, take, switchMap, map, catchError } from 'rxjs/operators';
import { GearService } from './gear.service';

@Injectable({
    providedIn: 'root'
})
export class EnsureGearGuard implements CanActivate {
  constructor(private gear: GearService) {}

  canActivate(): Observable<boolean> {
    return this.gear.loaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.gear.getAll()
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
export class EnsureSelectedGearGuard implements CanActivate {
constructor(private router: Router, private gear: GearService) {}

  waitForCollectionToLoad(): Observable<boolean> {
    return this.gear.loaded$.pipe(
      filter((loaded) => {
        return loaded
      }),
      take(1)
    );
  }

  hasGearInState(id: string): Observable<boolean> {
    return this.gear.keys$.pipe(
      map((entities) => !!entities[id]),
      take(1)
    );
  }

  hasGearInApi(id: string): Observable<boolean> {
    return this.gear.getByKey(id).pipe(
      map(hero => !!hero),
      catchError(() => {
        this.router.navigate(['/404']);
        return of(false)
      })
    )
  }

  hasGear(id: string): Observable<boolean> {
    return this.hasGearInState(id).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasGearInApi(id);
      })
    );
  }

  canActivate(): Observable<boolean> {

    return this.gear.selectedId$.pipe(
      switchMap((gearId) => this.hasGear(gearId))
    );
  }
}