import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { GearInstance, GearService } from '@avengers-game-guide/shared/gear/data-access';
import { PerkService } from '@avengers-game-guide/shared/perks/data-access';
import { GearSlot } from '@avengers-game-guide/shared/data';
import { Hero } from '@avengers-game-guide/shared/heroes/data-access';

@Component({
  selector: 'agg-gear-instance-viewer',
  templateUrl: './gear-instance-viewer.component.html',
  styleUrls: ['./gear-instance-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GearInstanceViewerComponent implements OnInit {

  @Input() activeGear: GearInstance
  @Input() hero: Hero
  @Input() gearSlot: GearSlot;

  @Output() removed = new EventEmitter<GearInstance>();



  constructor(private perkService: PerkService, private gearService: GearService) { }

  ngOnInit(): void {
  }

  getGearDefinition(id: string) {
    return this.gearService.getGearDefinition(id)
  }

  getPerk$(id: string) {
    return this.perkService.getPerk(id);
  }

  remove() {
    console.log('remove')
    this.removed.emit()
  }

}
