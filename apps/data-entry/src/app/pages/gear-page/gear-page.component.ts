import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { GearDefinition, GearService } from '@avengers-game-guide/shared/gear/data-access';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { PerkService } from '@avengers-game-guide/shared/perks/data-access';
import { BaseDataPage } from '../base-data-page'

@Component({
  selector: 'aggd-gear-page',
  templateUrl: './gear-page.component.html',
  styleUrls: ['./gear-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GearPageComponent extends BaseDataPage<GearDefinition> implements OnInit {
  FILTER_KEY = 'filters:gear';
  
  constructor(storage: StorageMap, public gearService: GearService, public perkService: PerkService, public heroService: HeroService) {
    super(storage, gearService)
  }
}
