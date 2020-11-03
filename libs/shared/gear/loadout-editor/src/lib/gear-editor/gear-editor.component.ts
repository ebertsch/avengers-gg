import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { GearTemplate } from '../types';
import { times } from 'ramda';
import { FormControl, FormGroup } from '@angular/forms';
import { GearEditorService } from '../../gear-editor.service';
import { Hero } from '@avengers-game-guide/shared/heroes/data-access';

@Component({
  selector: 'agg-gear-editor',
  templateUrl: './gear-editor.component.html',
  styleUrls: ['./gear-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'gearEditor'
})
export class GearEditorComponent implements OnInit, OnChanges {
  gearInstanceForm: FormGroup;
  _activeGear: GearTemplate;
  
  @Input() hero: Hero;
  @Input() set activeGear(value: GearTemplate) {
    this._activeGear = { ...value };
  }
  get activeGear() { return this._activeGear }
  @Output() saved = new EventEmitter<GearTemplate>();
  @Output() removed = new EventEmitter<GearTemplate>();

  @Input() availableGear = [
    {id: 1, title: 'Gear 1' },
    {id: 2, title: 'Gear 2' },
    {id: 3, title: 'Gear 3' },
    {id: 4, title: 'Gear 4' },
    {id: 5, title: 'Gear 5' }
  ]


  constructor(public gearEditor: GearEditorService) {
  }

  getAvailablePerksArray(perkSlot: number) {
    return times(idx=> ({id:`p${idx + (perkSlot * 4)}`, name: `perk ${idx + (perkSlot * 4)}`}), 4)
  }

  byId(value: {id:string}) {
    return value.id;
  }

  ngOnInit(): void {
    this.setFormValues()
  }

  ngOnChanges(): void {
    this.setFormValues()
  }

  setFormValues() {
    this.gearInstanceForm = new FormGroup({
      id: new FormControl(this.activeGear.id),
      rarity: new FormControl(this.activeGear.rarity),
      powerLevel: new FormControl(this.activeGear.powerLevel),
      slot: new FormControl(this.activeGear.slot),
      stat1: new FormGroup({
        stat: new FormControl(this.activeGear.stat1.stat),
        value: new FormControl(this.activeGear.stat1.value),
      }),
      stat2: new FormGroup({
        stat: new FormControl(this.activeGear.stat2.stat),
        value: new FormControl(this.activeGear.stat2.value),
      }),
      stat3: new FormGroup({
        stat: new FormControl(this.activeGear.stat3.stat),
        value: new FormControl(this.activeGear.stat3.value),
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
    this.removed.emit(this.gearInstanceForm.value)
  }

}
