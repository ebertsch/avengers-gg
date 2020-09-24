import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { Perk, PerkService } from '@avengers-game-guide/shared/perks/data-access';
import { groupBy, prop } from 'ramda';
import { Observable } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

export interface GroupedPerks {
  [id: string]: Perk[];
}


@Component({
  templateUrl: './perks-view.component.html',
  styleUrls: ['./perks-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerksViewComponent implements OnInit {
  perks$: Observable<GroupedPerks>

  constructor(private perks: PerkService, private heroes: HeroService) {
    this.perks$ = this.heroes.selected$.pipe(
      tap(hero => this.perks.getWithQuery(`heroId_like=${hero.id}&heroId_like=\\*`)),
      switchMap(() => this.perks.entities$),
      map(data => groupBy(prop('gearType'), data) )
    )
  }

  ngOnInit(): void {
  }

}
