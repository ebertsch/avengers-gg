import { Component, OnInit, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';
import { GearDefinition } from '@avengers-game-guide/shared/gear/data-access';
import { PerkService } from '@avengers-game-guide/shared/perks/data-access';
import { SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  navigation: true,
  slidesPerView: 1,
  pagination: false
};

@Component({
  selector: 'agg-gear',
  templateUrl: './gear.component.html',
  styleUrls: ['./gear.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class GearComponent implements OnInit {

  @Input() gear: GearDefinition;

  @HostBinding('class.legendary') get isLegendary() { return this.gear.rarity === 'legendary' };
  @HostBinding('class.exotic') get isExotic() { return this.gear.rarity === 'exotic' };
  @HostBinding('class.epic') get isEpic() { return this.gear.rarity === 'epic' };
  @HostBinding('class.rare') get isRare() { return this.gear.rarity === 'rare' };
  @HostBinding('class.uncommon') get isUncommon() { return this.gear.rarity === 'uncommon' };


  constructor(private perkService: PerkService) { }

  ngOnInit(): void {
  }

  getPerk$(id: string) {
    return this.perkService.getPerk(id);
  }

}
