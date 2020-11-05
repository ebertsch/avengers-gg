import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { GearInstance } from '@avengers-game-guide/shared/gear/data-access';
import { PerkService } from '@avengers-game-guide/shared/perks/data-access';

@Component({
  selector: 'agg-gear-instance-viewer',
  templateUrl: './gear-instance-viewer.component.html',
  styleUrls: ['./gear-instance-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GearInstanceViewerComponent implements OnInit {

  @Input() activeGear: GearInstance

  get gearName() {
    return 'Generate Gear Name Here or make a component'
  }

  constructor(private perkService: PerkService) { }

  ngOnInit(): void {
  }

  getPerk$(id: string) {
    return this.perkService.getPerk(id);
  }

}
