import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GearService } from '@avengers-game-guide/shared/gear/data-access';
import { PerkService } from '@avengers-game-guide/shared/perks/data-access';

@Component({
  templateUrl: './tools-page.component.html',
  styleUrls: ['./tools-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolsPageComponent implements OnInit {

  constructor(private gearService: GearService, private perksService: PerkService) { }

  ngOnInit(): void {
  }

  indexGear() {
    this.gearService.indexGear()
  }
  indexPerks() {
    this.perksService.indexPerks()
  }

}
