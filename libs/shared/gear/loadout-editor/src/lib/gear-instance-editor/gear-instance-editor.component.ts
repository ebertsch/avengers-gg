import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { GearDefinition, GearInstance, GearService, GearSlot } from '@avengers-game-guide/shared/gear/data-access';
import { times } from 'ramda';
import { FormControl, FormGroup } from '@angular/forms';
import { GearEditorService } from '../gear-editor.service';
import { Hero } from '@avengers-game-guide/shared/heroes/data-access';
import { Observable } from 'rxjs';
import { Perk, PerkService } from '@avengers-game-guide/shared/perks/data-access';

@Component({
  selector: 'agg-gear-instance-editor',
  templateUrl: './gear-instance-editor.component.html',
  styleUrls: ['./gear-instance-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'gearEditor'
})
export class GearInstanceEditorComponent implements OnInit, OnChanges {
  gearInstanceForm: FormGroup;
  _activeGear: GearInstance;
  
  @Input() hero: Hero;
  @Input() gearSlot: GearSlot;
  @Input() set activeGear(value: GearInstance) {
    if(value === null) {
      this._activeGear = {
        id: null,
        rarity: null,
        powerLevel: null,
        stat1: { stat: null, value: null },
        stat2: { stat: null, value: null },
        stat3: { stat: null, value: null },
        perk1: null,
        perk2: null,
        perk3: null
      }
    } else {
      this._activeGear = { ...value };
    }
  }
  get activeGear() { return this._activeGear }
  @Output() saved = new EventEmitter<GearInstance>();
  @Output() removed = new EventEmitter<GearInstance>();



  @Input() availableGear = [
    {id: 1, title: 'Gear 1' },
    {id: 2, title: 'Gear 2' },
    {id: 3, title: 'Gear 3' },
    {id: 4, title: 'Gear 4' },
    {id: 5, title: 'Gear 5' }
  ]

  perks$: Observable<Perk[]>
  gear$: Observable<GearDefinition[]>

  constructor(public gearEditor: GearEditorService, private perkService: PerkService, private gearService: GearService) {
  }

  getAvailablePerksArray(perkSlot: number) {
    return times(idx=> ({id:`p${idx + (perkSlot * 4)}`, name: `perk ${idx + (perkSlot * 4)}`}), 4)
  }

  byId(value: {id:string}) {
    return value.id;
  }

  ngOnInit(): void {
    this.setFormValues()
    this.perks$ = this.perkService.getGearPerks(this.gearSlot, this.hero.id)
    this.gear$ = this.gearService.getGearForHero(this.gearSlot, this.hero.id)
  }

  ngOnChanges(): void {
    this.setFormValues()
  }

  setFormValues() {
    this.gearInstanceForm = new FormGroup({
      id: new FormControl(this.activeGear.id),
      rarity: new FormControl(this.activeGear.rarity),
      powerLevel: new FormControl(this.activeGear.powerLevel),
      stat1: new FormGroup({
        stat: new FormControl(this.activeGear.stat1?.stat),
        value: new FormControl(this.activeGear.stat1?.value),
      }),
      stat2: new FormGroup({
        stat: new FormControl(this.activeGear.stat2?.stat),
        value: new FormControl(this.activeGear.stat2?.value),
      }),
      stat3: new FormGroup({
        stat: new FormControl(this.activeGear.stat3?.stat),
        value: new FormControl(this.activeGear.stat3?.value),
      }),
      perk1: new FormControl(this.activeGear.perk1),
      perk2: new FormControl(this.activeGear.perk2),
      perk3: new FormControl(this.activeGear.perk3),
    })
  }

  save() {
    this.saved.emit(this.gearInstanceForm.value)
  }

  remove() {
    this.removed.emit()
  }

}
