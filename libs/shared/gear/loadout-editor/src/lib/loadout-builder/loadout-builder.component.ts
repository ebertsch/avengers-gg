import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '@avengers-game-guide/shared/heroes/data-access';
import { BehaviorSubject, Observable } from 'rxjs';
import { GearInstance, GearSlot, Loadout } from '@avengers-game-guide/shared/gear/data-access';

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
  @Input() gearSlot: GearSlot

  activeGear$: Observable<GearInstance>

  constructor(private router: Router, private gearEditor: GearEditorService) {
    this.activeView$ = gearEditor.loadoutViewerView$;
    this.activeGear$ = gearEditor.activeGearInstance$;
  }
  
  ngOnInit(): void {
  }


  saveGearInstance(gearInstance: GearInstance) {
    console.log('save called', this.loadout, this.gearSlot, gearInstance);
    this.gearEditor.save(this.gearSlot, gearInstance, this.loadout);
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
