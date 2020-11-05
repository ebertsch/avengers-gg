import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '@avengers-game-guide/shared/heroes/data-access';
import { BehaviorSubject, Observable } from 'rxjs';
import { GearInstance, Loadout } from '@avengers-game-guide/shared/gear/data-access';

import { GearEditorService } from '../gear-editor.service';



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
  @Input() gearSlot: string

  activeGear$: BehaviorSubject<GearInstance>
  meleeGear$: Observable<GearInstance>

  meleeGear: GearInstance = {
    id: 'g1',
    slot: 'melee',
    powerLevel: 140,
    rarity: "legendary",
    stat1: {stat: "precision", value: 42}, 
    stat2: {stat: "resolve", value: 42},
    stat3: {stat: null, value: null},
    perk1: 'p5',
    perk2: 'p11',
    perk3: 'p15'
  }

  rangedGear: GearInstance = {
    id: 'CUSTOM',
    slot: 'ranged',
    powerLevel: 140,
    rarity: "legendary",
    stat1: {stat: "precision", value: 42},
    stat2: {stat: "resolve", value: 42},
    stat3: {stat: 'might', value: 41},
    perk1: 'p5',
    perk2: 'p11',
    perk3: 'p15'
  }

  constructor(private router: Router, private gearEditor: GearEditorService) {
    // this.meleeGear$ = gearEditor.getGearFromUrl('melee')
    this.activeView$ = gearEditor.loadoutViewerView$;
  }
  
  ngOnInit(): void {
    this.activeGear$ = new BehaviorSubject(this.meleeGear);
  }

  setCurrentGearTo(gear: GearInstance) {

    this.activeGear$.next(gear)
  }

  saveGearInstance(gearInstance: GearInstance) {
    this.gearEditor.save(gearInstance);
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
