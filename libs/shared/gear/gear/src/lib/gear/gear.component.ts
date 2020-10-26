import { Component, OnInit, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';
import { Gear } from '@avengers-game-guide/shared/gear/data-access';
import { PerkService } from '@avengers-game-guide/shared/perks/data-access';

@Component({
  selector: 'agg-gear',
  templateUrl: './gear.component.html',
  styleUrls: ['./gear.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GearComponent implements OnInit {

  @Input() gear: Gear;

  @HostBinding('class.legendary')
  get isLegendary() { return this.gear.rarity === 'legendary' };
  
  @HostBinding('class.exotic')
  get isExotic() { return this.gear.rarity === 'exotic' };


  constructor(private perkService: PerkService) { }

  ngOnInit(): void {
  }

  getPerk$(id: string) {
    return this.perkService.getPerk(id);
  }

}
