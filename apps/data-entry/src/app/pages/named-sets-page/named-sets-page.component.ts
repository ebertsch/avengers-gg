import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { GearService } from '@avengers-game-guide/shared/gear/data-access';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { BaseDataPage } from '../base-data-page'
import { NamedSetService, NamedSet } from '@avengers-game-guide/shared/named-sets/data-access';

@Component({
  selector: 'aggd-named-sets-page',
  templateUrl: './named-sets-page.component.html',
  styleUrls: ['./named-sets-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NamedSetsPageComponent extends BaseDataPage<NamedSet> implements OnInit {
  FILTER_KEY = 'filters:namedSet'

  constructor(storage: StorageMap, public namedSetService: NamedSetService, public heroService: HeroService, public gearService: GearService ) {
    super(storage, namedSetService)
  }

}
