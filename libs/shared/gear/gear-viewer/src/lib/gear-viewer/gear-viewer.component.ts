import { Component, OnInit, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';
import { GearView } from '../gear-view';
import { Perk } from '@avengers-game-guide/shared/perks/data-access';
import { GearDefinition, GearInstance } from '@avengers-game-guide/shared/gear/data-access';
import { Hero } from '@avengers-game-guide/shared/heroes/data-access';
import { pathOr, propOr } from 'ramda';
import { SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  navigation: true
};


@Component({
  selector: 'agg-gear-viewer',
  templateUrl: './gear-viewer.component.html',
  styleUrls: ['./gear-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class GearViewerComponent implements OnInit {

  gear: GearView;
  @Input() set value (value: GearDefinition | GearInstance) {
    this.gear = new GearView(value)
  }
  @Input() perks: {[key: string]: Perk} = {}
  @Input() gearDefinitions:  {[key: string]:GearDefinition} = {}
  @Input() hero: Hero
  @Input() gearType: string

  @HostBinding('class') get hostClasses() { return this.gear.rarity; }

  constructor() { }

  ngOnInit(): void {
  }

  getGearType() {
    if(!!this.gear.type) {
      return this.gear.type
    }
    
    return this.gearType
  }

  getPrimaryPerk() {
    if(this.gear.hasPerkVariants(1)) {
      return this.gear.perks1[0] as string
    } else {
      return this.gear.perks1 as string
    }
  }

  gearTitleFromId() {
    if(!this.hero || !this.gear.perks1) return this.gear.id
    if(this.gear.id.toLowerCase() === 'custom') {
      const gearTypeName = pathOr('', ['gearNames', this.getGearType()],  this.hero)
      const perkId = this.getPrimaryPerk()
      const perk = this.gearPerkForId(perkId)
      return `${perk.title} ${gearTypeName}`
    }
    
    return pathOr(this.gear.id, [this.gear.id, 'name'], this.gearDefinitions)
  }

  gearPerkForId(perkId): Perk {
    const NOT_FOUND = { title: 'Not Found', description: '' } as Perk

    if(!perkId || this.perks === {}) return NOT_FOUND
    
    return propOr<Perk, {[key: string]: Perk}, Perk>(NOT_FOUND, perkId, this.perks)
  }

}
