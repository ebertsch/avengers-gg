import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { BaseDataPage } from '../base-data-page'
import { Guide, GuideService } from '@avengers-game-guide/shared/guides/data-access';


@Component({
  templateUrl: './guides-page.component.html',
  styleUrls: ['./guides-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuidesPageComponent extends BaseDataPage<Guide> implements OnInit {
  FILTER_KEY = 'filters:guides';
  
  constructor(storage: StorageMap, public guideService: GuideService, public heroService: HeroService) {
    super(storage, guideService)
  }

}
