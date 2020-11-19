import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { GearDefinition, GearInstance, GearService } from '@avengers-game-guide/shared/gear/data-access';
import { GearSlot } from '@avengers-game-guide/shared/data';
import { assocPath, pathOr } from 'ramda';
import { FormControl, FormGroup } from '@angular/forms';
import { GearEditorService } from '../gear-editor.service';
import { Hero } from '@avengers-game-guide/shared/heroes/data-access';
import { BehaviorSubject, Observable } from 'rxjs';
import { Perk, PerkService } from '@avengers-game-guide/shared/perks/data-access';
import { map, withLatestFrom } from 'rxjs/operators';

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
    if (value === null) {
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
  activeGear$: BehaviorSubject<GearDefinition>;
  allowAnyPerk = false;

  @Output() saved = new EventEmitter<GearInstance>();
  @Output() removed = new EventEmitter<GearInstance>();


  perks$: Observable<Perk[]>
  gear$: Observable<GearDefinition[]>

  constructor(public gearEditor: GearEditorService, public perkService: PerkService, private gearService: GearService) {
  }

  byId(idx: number, value: { id: string }) {
    return value.id;
  }

  byValue(idx: number, value: string | number) {
    return value
  }

  ngOnInit(): void {
    this.setupForm()
    this.perks$ = this.perkService.getGearPerks(this.gearSlot, this.hero.id)
    this.gear$ = this.gearService.getGearForHero(this.gearSlot, this.hero.id)
  }

  ngOnChanges(): void {
    this.updateForm(this._activeGear);
  }

  isEmpty(item: any) {
    return item === null || item === undefined || item === '' || item === []
  }

  isNotEmpty(item: any) {
    return !this.isEmpty(item)
  }

  setupForm() {
    this.gearInstanceForm = new FormGroup({
      id: new FormControl(this.activeGear.id),
      rarity: new FormControl(this.activeGear.rarity),
      powerLevel: new FormControl(this.activeGear.powerLevel),
      allowAnyPerk: new FormControl(false),
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


    this.activeGear$ = new BehaviorSubject(this.gearInstanceForm.value)
    this.gearInstanceForm.valueChanges.subscribe(c => {
      this.updateStats(c)
      this.activeGear$.next(c)
    })

    this.gearInstanceForm.get('id').valueChanges.pipe(
      withLatestFrom(this.gearService.entityMap$),
      map(([id, gear]) => gear[id]),
    ).subscribe(this.templateChosen.bind(this));
  }

  updateStats(value: GearInstance) {
    const attributeRange = this.gearEditor.getAttributeValueRange(value)
    let patchValue = {};

    if (value.stat1 && value.stat1.stat) {
      const v = value.stat1.value || 0;
      if (v > attributeRange.high) {
        patchValue = assocPath(['stat1', 'value'], attributeRange.high, patchValue)
      }
      if (v < attributeRange.low) {
        patchValue = assocPath(['stat1', 'value'], attributeRange.high, patchValue)
      }
    }
    if (value.stat2 && value.stat2.stat) {
      const v = value.stat2.value || 0;
      if (v > attributeRange.high) {
        patchValue = assocPath(['stat2', 'value'], attributeRange.high, patchValue)
      }
      if (v < attributeRange.low) {
        patchValue = assocPath(['stat2', 'value'], attributeRange.high, patchValue)
      }
    }
    if (value.stat3 && value.stat3.stat) {
      const v = value.stat3.value || 0;
      if (v > attributeRange.high) {
        patchValue = assocPath(['stat3', 'value'], attributeRange.high, patchValue)
      }
      if (v < attributeRange.low) {
        patchValue = assocPath(['stat3', 'value'], attributeRange.high, patchValue)
      }
    }

    if (value.stat1 && !value.stat1.stat) {
      patchValue = assocPath(['stat1', 'value'], null, patchValue)
    }
    if (value.stat2 && !value.stat2.stat) {
      patchValue = assocPath(['stat2', 'value'], null, patchValue)
    }
    if (value.stat3 && !value.stat3.stat) {
      patchValue = assocPath(['stat3', 'value'], null, patchValue)
    }

    this.gearInstanceForm.patchValue(patchValue, { emitEvent: false });
  }

  updateForm(value: GearInstance) {
    if (this.gearInstanceForm === undefined) { return }
    this.gearInstanceForm.setValue(value)
    this._activeGear = { ...this.activeGear }
  }

  templateChosen(gearDefinition: GearDefinition) {
    const instance: Partial<GearInstance> = {
      rarity: pathOr(null, ['rarity'], gearDefinition),
      perk1: pathOr(null, ['perks1', 0], gearDefinition),
      perk2: pathOr(null, ['perks2', 0], gearDefinition),
      perk3: pathOr(null, ['perks3', 0], gearDefinition),
    }
    this.gearInstanceForm.patchValue(instance)
  }

  save() {
    this.saved.emit(this.gearInstanceForm.value)
  }

  remove() {
    this.removed.emit()
  }

}
