import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { groupBy, prop } from 'ramda';
import { Observable } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { Perk, PerkService } from '@avengers-game-guide/shared/perks/data-access';
import { GearDefinition, GearService } from '@avengers-game-guide/shared/gear/data-access'
import { Dictionary } from '@ngrx/entity';
import { NamedSet, NamedSetService } from '@avengers-game-guide/shared/named-sets/data-access';

@Component({
  templateUrl: './gear-view.component.html',
  styleUrls: ['./gear-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GearViewComponent implements OnInit {
  namedSets$: Observable<NamedSet[]>;
  selectedGear: string;
  view = 'list'

  constructor(
    private gearService: GearService,
    private perkService: PerkService,
    private heroService: HeroService,
    private namedSetsService: NamedSetService,
    private titleService: Title) {
    this.namedSets$ = this.heroService.selected$.pipe(
      tap(hero => this.titleService.setTitle(`Avengers GG | Gear | ${hero.name}`)),
      tap(hero => {this.gearService.clearCache(); this.gearService.getWithQuery({hero_id: hero.id, include_wildcard:'*'}) }),
      tap(hero => {this.perkService.clearCache(); this.perkService.getWithQuery({hero_id: hero.id, include_wildcard:'*'}) }),
      tap(hero => {this.namedSetsService.clearCache(); this.namedSetsService.getWithQuery({hero_id: hero.id })}),
      switchMap(() => this.namedSetsService.entities$)
    )
  }

  ngOnInit(): void {
  }

  getSourcesText(set: NamedSet) {
    return (set.sources||[]).map(s => s.from).join(', ')
  }

  getGearPiece(id: string) {
    return this.gearService.getGearDefinition(id)
  }

  showGearRow(id: string) {
    if(this.selectedGear ===  id)
      this.selectedGear = null
    else
      this.selectedGear =  id;
  }
}
