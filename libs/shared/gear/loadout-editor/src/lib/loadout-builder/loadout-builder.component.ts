import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '@avengers-game-guide/shared/heroes/data-access';
import { toPairs, fromPairs } from 'ramda';
import { BehaviorSubject, Observable } from 'rxjs';
import { GearRarity, GearTemplate, MinimalGear } from '../types';
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from '@avengers-game-guide/shared/data'
import { GearEditorService } from '../../gear-editor.service';



@Component({
  selector: 'agg-loadout-builder',
  templateUrl: './loadout-builder.component.html',
  styleUrls: ['./loadout-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadoutBuilderComponent implements OnInit {

  @Input() hero: Hero
  activeGear$: BehaviorSubject<GearTemplate>

  meleeGear$: Observable<GearTemplate>

  meleeGear: GearTemplate = {
    id: 'g1',
    slot: 'melee',
    powerLevel: 140,
    rarity: GearRarity.Legendary,
    stat1: {stat: "precision", value: 42}, 
    stat2: {stat: "resolve", value: 42},
    stat3: {stat: null, value: null},
    perk1: 'p5',
    perk2: 'p11',
    perk3: 'p15'
  }

  rangedGear: GearTemplate = {
    id: 'CUSTOM',
    slot: 'ranged',
    powerLevel: 140,
    rarity: GearRarity.Legendary,
    stat1: {stat: "precision", value: 42},
    stat2: {stat: "resolve", value: 42},
    stat3: {stat: 'might', value: 41},
    perk1: 'p5',
    perk2: 'p11',
    perk3: 'p15'
  }

  constructor(private router: Router, private gearEditor: GearEditorService) {
    this.meleeGear$ = gearEditor.getGearFromUrl('melee')
  }
  
  ngOnInit(): void {
    this.activeGear$ = new BehaviorSubject(this.meleeGear);
  }

  setCurrentGearTo(gear: GearTemplate, activeGear: GearTemplate) {
    if(gear.id === activeGear?.id) return this.activeGear$.next(null)

    this.activeGear$.next(gear)
  }

  saveGearInstance(gearInstance: GearTemplate) {
    this.gearEditor.save(gearInstance);
  }

}
