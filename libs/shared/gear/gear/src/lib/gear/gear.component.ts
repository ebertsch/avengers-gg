import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
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

  constructor(private perkService: PerkService) { }

  ngOnInit(): void {
  }

  getPerk$(id: string) {
    return this.perkService.getPerk(id);
  }

}
