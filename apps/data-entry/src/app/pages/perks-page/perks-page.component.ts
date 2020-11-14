import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { Perk, PerkService } from '@avengers-game-guide/shared/perks/data-access';
import { BaseDataPage } from '../base-data-page'
import { GearDefinition, GearService } from '@avengers-game-guide/shared/gear/data-access';
import { takeWhile, tap, map } from 'rxjs/operators';
import { flatten, map as rmap, pick, reduce, values } from 'ramda';


@Component({
  selector: 'aggd-perks-page',
  templateUrl: './perks-page.component.html',
  styleUrls: ['./perks-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerksPageComponent extends BaseDataPage<Perk> implements OnInit {
  FILTER_KEY = 'filters:perks';

  gear:string[][];
  
  constructor(storage: StorageMap, public perkService: PerkService, public heroService: HeroService, public gearService: GearService) {
    super(storage, perkService)

    this.gearService.entities$.pipe(
      takeWhile(() => this.gear !== null),
      map(items => 
        rmap(i => flatten(values(pick(['perks1', 'perks2', 'perks3'], i))) as string[], items)
      )
    ).subscribe(x => this.gear = x);
  }

  appearsOnGear(perk: Perk) {
    if((this.gear||[]).length < 1) return 0;

    return reduce((acc, cur)=>{
      const isUsed = cur.indexOf(perk.id) > -1  ? 1 : 0
      return acc + isUsed
    }, 0, this.gear)
  }

}
