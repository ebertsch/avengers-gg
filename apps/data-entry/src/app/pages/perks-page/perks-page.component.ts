import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { Perk, PerkService } from '@avengers-game-guide/shared/perks/data-access';
import { BaseDataPage } from '../base-data-page'


@Component({
  selector: 'aggd-perks-page',
  templateUrl: './perks-page.component.html',
  styleUrls: ['./perks-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerksPageComponent extends BaseDataPage<Perk> implements OnInit {
  FILTER_KEY = 'filters:perks';
  
  constructor(storage: StorageMap, public perkService: PerkService, public heroService: HeroService) {
    super(storage, perkService)
  }

}
