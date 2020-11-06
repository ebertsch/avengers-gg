import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { groupBy, prop } from 'ramda';
import { Observable } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { Perk, PerkService } from '@avengers-game-guide/shared/perks/data-access';
import { GearDefinition, GearService } from '@avengers-game-guide/shared/gear/data-access'
import { Dictionary } from '@ngrx/entity';

@Component({
  templateUrl: './gear-view.component.html',
  styleUrls: ['./gear-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GearViewComponent implements OnInit {
  gear$: Observable<Dictionary<GearDefinition[]>>;
  selectedGear: string;

  constructor(private gearService: GearService, private perkService: PerkService, private heroService: HeroService, private titleService: Title) {
    this.gear$ = this.heroService.selected$.pipe(
      tap(hero => this.titleService.setTitle(`Avengers GG | Gear | ${hero.name}`)),
      tap(hero => {this.gearService.clearCache(); this.gearService.getWithQuery(`heroId_like=${hero.id}&heroId_like=\\*`)}),
      tap(hero => {this.perkService.clearCache(); this.perkService.getWithQuery(`heroId_like=${hero.id}&heroId_like=\\*`)}),
      switchMap(() => this.gearService.entities$),
      map(data => groupBy(prop('set'), data) )
    )
  }

  ngOnInit(): void {
  }

  showGearRow(id: string) {
    if(this.selectedGear ===  id)
      this.selectedGear = null
    else
      this.selectedGear =  id;
  }
}
