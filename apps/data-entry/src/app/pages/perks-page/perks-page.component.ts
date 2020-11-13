import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { Perk, PerkService } from '@avengers-game-guide/shared/perks/data-access';
import { BaseDataPage } from '../base-data-page'
import { GearDefinition, GearService } from '@avengers-game-guide/shared/gear/data-access';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'aggd-perks-page',
  templateUrl: './perks-page.component.html',
  styleUrls: ['./perks-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerksPageComponent extends BaseDataPage<Perk> implements OnInit {
  FILTER_KEY = 'filters:perks';

  private gear = new BehaviorSubject<GearDefinition[]>([]);

  
  constructor(storage: StorageMap, public perkService: PerkService, public heroService: HeroService, public gearService: GearService) {
    super(storage, perkService)
  }

}
