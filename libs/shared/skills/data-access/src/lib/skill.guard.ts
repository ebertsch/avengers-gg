import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, } from 'rxjs';
import { tap, filter, first} from 'rxjs/operators';
import { SkillService } from './skill.service';

@Injectable({
    providedIn: 'root'
})
export class EnsureSkillsGuard implements CanActivate {
  constructor(private skills: SkillService) {}

  canActivate(): Observable<boolean> {
    return this.skills.loaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.skills.getAll()
        }
      }),
      filter(loaded => loaded),
      first()
    );
  }
}
