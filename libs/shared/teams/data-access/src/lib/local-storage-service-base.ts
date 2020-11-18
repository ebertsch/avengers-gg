import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Loadout } from '@avengers-game-guide/shared/data'
import { GearInstance } from '@avengers-game-guide/shared/gear/data-access'
import { StorageMap } from '@ngx-pwa/local-storage';
import { keys, pathOr, propOr, values } from 'ramda';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, take, tap } from 'rxjs/operators';
import { mergeRight, mergeDeepRight, dissoc } from 'ramda';

const STORAGE_KEY = 'TEAM';


interface DictionaryNum<T> {
  [id: number]: T | undefined;
}
declare abstract class Dictionary<T> implements DictionaryNum<T> {
  [id: string]: T | undefined;
}


@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceBase<T> {
  _data$ = new BehaviorSubject<Dictionary<T>>(null);
  _error$ = new BehaviorSubject<Error>(null)

  entityMap$: Observable<Dictionary<T>> = this._data$.asObservable().pipe
  (
    distinctUntilChanged()
  )
  entities$: Observable<T[]> = this.entityMap$.pipe(map(team => values(team)))
  keys$: Observable<string[]> = this.entityMap$.pipe(map(team => keys(team) as string[]))

  constructor(private storage: StorageMap) {
    this.load()
  }

  private load() {
    this.storage.get(STORAGE_KEY).subscribe({
      next: (data: Dictionary<T>) => { 
        this._data$.next(data)
        this._error$.next(null)
       },
      error: (error) => { 
        this._data$.next(null)
        this._error$.next(error)
       },
    })
  }

  private save(value: Dictionary<T>) {
    this.storage.set(STORAGE_KEY, value).subscribe({
      next: (data: Dictionary<T>) => { 

        this._data$.next(value)
        this._error$.next(null)
       },
      error: (error) => { 
        this._data$.next(null)
        this._error$.next(error)
       },
    })
  }

  add(key: string, data: T) {
    this.entityMap$.pipe(
      take(1)
    ).subscribe((latest: Dictionary<T>) => {
      const modified = mergeRight(latest, { [key]: data }) as Dictionary<T>
      this.save(modified)
    })
  }

  upsert(key: string, data: T) {
    this.entityMap$.pipe(
      take(1)
    ).subscribe(latest => {
      const modified = mergeDeepRight(latest, { [key]: data }) as Dictionary<T>
      this.save(modified)
    })
  }

  delete(key: string) {
    this.entityMap$.subscribe(data => {
      const modified = dissoc(key, data) as Dictionary<T>
      this.save(modified)
    })
  }
}
