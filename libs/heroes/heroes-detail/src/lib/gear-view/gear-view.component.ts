import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { groupBy, prop } from 'ramda';
import { Observable } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { Gear, GearService } from '@avengers-game-guide/shared/gear/data-access'

export interface GroupedGear {
  [id: string]: Gear[];
}


@Component({
  templateUrl: './gear-view.component.html',
  styleUrls: ['./gear-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GearViewComponent implements OnInit {
  gear$: Observable<GroupedGear>

  constructor(gearService: GearService, private heroes: HeroService) {
    this.gear$ = this.heroes.selected$.pipe(
      tap(hero => gearService.getWithQuery(`heroId_like=${hero.id}&heroId_like=\\*`)),
      switchMap(() => gearService.entities$),
      map(data => groupBy(prop('set'), data) )
    )
  }

  ngOnInit(): void {
  }
}
