import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { Title } from '@angular/platform-browser';

import { Perk, PerkService } from '@avengers-game-guide/shared/perks/data-access';
import { pluck, flatten, uniq, contains, filter, mergeAll, map as rMap } from 'ramda';
import { Observable } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

export interface GroupedPerks {
  [id: string]: Perk[];
}

const groupPerks = (data: Perk[]) => {
  const keys = uniq(flatten(pluck('gear', data)))

  return mergeAll(
    rMap((key: string) => ({
      [key]: filter(p => contains(key, p.gear), data)
    }), keys)
  )
}

@Component({
  templateUrl: './perks-view.component.html',
  styleUrls: ['./perks-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerksViewComponent implements OnInit {
  perks$: Observable<GroupedPerks>

  constructor(private perks: PerkService, private heroes: HeroService, private titleService: Title) {
    this.perks$ = this.heroes.selected$.pipe(
      tap(hero => this.titleService.setTitle(`Avengers GG | Perks | ${hero.name}`)),
      tap(hero => { this.perks.clearCache(); this.perks.getWithQuery(`heroId_like=${hero.id}`)}),
      switchMap(() => this.perks.entities$),
      map(data => groupPerks(data))
    )
  }

  ngOnInit(): void {
  }

}
