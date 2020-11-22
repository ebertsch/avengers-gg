import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '@avengers-game-guide/shared/heroes/data-access';
import { Observable } from 'rxjs';
import { GearInstance, GearService, Loadout, UserGearInstanceService, UserGearInstance } from '@avengers-game-guide/shared/gear/data-access';
import { GearSlot } from '@avengers-game-guide/shared/data';

import { PerkService } from '@avengers-game-guide/shared/perks/data-access';

import { GearEditorService } from '../gear-editor.service';
import { path, pathOr, pick, prop, propOr } from 'ramda';



@Component({
  selector: 'agg-loadout-builder',
  templateUrl: './loadout-builder.component.html',
  styleUrls: ['./loadout-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadoutBuilderComponent implements OnInit {
  activeView$: Observable<string>

  @Input() hero: Hero
  @Input() loadout: Loadout
  @Input() gearSlot: GearSlot

  activeGear$: Observable<GearInstance>
  gearMenuOpen = false

  constructor(private router: Router, private gearEditor: GearEditorService,
    private userGearInstanceService: UserGearInstanceService, private perkService: PerkService,
    private gearService: GearService) {
    this.activeView$ = gearEditor.loadoutViewerView$;
    this.activeGear$ = gearEditor.activeGearInstance$;
  }

  ngOnInit(): void {
    this.perkService.getAll();
    this.gearService.getWithQuery(`heroId_like=${this.hero.id}&heroId_like=\\*`)
  }

  saveGearInstance(gearInstance: GearInstance) {
    this.gearEditor.save(this.gearSlot, gearInstance, this.loadout);
    this.userGearInstanceService.add(new UserGearInstance(gearInstance))
  }

  removeGearInstance() {
    this.gearEditor.remove(this.gearSlot, this.loadout);
  }

  setActiveGearSlot(g: string) {
    this.router.navigate(
      [],
      {
        queryParams: { g },
        queryParamsHandling: 'merge'
      });
  }

}
