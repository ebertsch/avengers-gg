import { Component, OnInit, ChangeDetectionStrategy, forwardRef, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ItemSource } from '@avengers-game-guide/shared/data';
import { GearDefinition } from '@avengers-game-guide/shared/gear/data-access';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { Perk, PerkService } from '@avengers-game-guide/shared/perks/data-access';
import { append, concat } from 'ramda';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, mergeMap, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'aggd-gear-edit-form',
  templateUrl: './gear-edit-form.component.html',
  styleUrls: ['./gear-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'gearEditorForm'
})
export class GearEditFormComponent implements OnInit, OnChanges {
  formValue: FormGroup
  private _value: GearDefinition;
  @Input() set value(value: GearDefinition) { this._value = { ...value } }
  get value() { return this._value }
  value$: BehaviorSubject<GearDefinition>;

  perk1Auto = new FormControl()
  perk1Options: Observable<Perk[]>;

  perk2Auto = new FormControl()
  perk2Options: Observable<Perk[]>;

  perk3Auto = new FormControl()
  perk3Options: Observable<Perk[]>;


  constructor(public perkService: PerkService, public heroService: HeroService) { }

  ngOnInit(): void {
    this.setupForm()
  }

  ngOnChanges(): void {
    this.updateForm(this._value);
  }

  setupForm() {
    this.formValue = new FormGroup({
      id: new FormControl(this.value.id),
      name: new FormControl(this.value.name),
      set: new FormControl(this.value.set),
      heroId: new FormControl(this.value.heroId),
      gearType: new FormControl(this.value.gearType),
      perks1: new FormControl(this.value.perks1),
      perks2: new FormControl(this.value.perks2),
      perks3: new FormControl(this.value.perks3),
      rarity: new FormControl(this.value.rarity),
      stats: new FormArray([]),
      sources: new FormArray([])
    })

    this.perk1Options = this.perk1Auto.valueChanges.pipe(
      startWith(''),
      withLatestFrom(this.perkService.getGearSlotPerks(this.value.gearType)),
      map(([val, opts]) => opts.filter(v => v.title.toLowerCase().includes(val) || v.description.toLowerCase().includes(val)))
    )
    this.perk2Options = this.perk2Auto.valueChanges.pipe(
      startWith(''),
      withLatestFrom(this.perkService.getGearSlotPerks(this.value.gearType)),
      map(([val, opts]) => opts.filter(v => v.title.toLowerCase().includes(val) || v.description.toLowerCase().includes(val)))
    )
    this.perk3Options = this.perk3Auto.valueChanges.pipe(
      startWith(''),
      withLatestFrom(this.perkService.getGearSlotPerks(this.value.gearType)),
      map(([val, opts]) => opts.filter(v => v.title.toLowerCase().includes(val) || v.description.toLowerCase().includes(val)))
    )

    for (let x = 0; x < (this.value.sources || []).length; x++) {
      this.addSource(this.value.sources[x])
    }

    this.value$ = new BehaviorSubject(this.formValue.value)
    this.formValue.valueChanges.subscribe(c => this.value$.next(c))
  }

  addToPerks1(opt: MatAutocompleteSelectedEvent) {
    const perks1 = concat(this.formValue.value.perks1 || [], [opt.option.value.id])
    this.formValue.patchValue({ perks1 })
    this.perk1Auto.reset()
  }
  addToPerks2(opt: MatAutocompleteSelectedEvent) {
    const perks2 = concat(this.formValue.value.perks2 || [], [opt.option.value.id])
    this.formValue.patchValue({ perks2 })
    this.perk2Auto.reset()
  }
  addToPerks3(opt: MatAutocompleteSelectedEvent) {
    const perks3 = concat(this.formValue.value.perks3 || [], [opt.option.value.id])
    this.formValue.patchValue({ perks3 })
    this.perk3Auto.reset()
  }

  get sources() {
    return this.formValue.get('sources') as FormArray
  }

  addSource(value: ItemSource = { type: '', from: '' }) {
    (this.formValue.get('sources') as FormArray).push(
      new FormGroup({
        type: new FormControl(value.type),
        from: new FormControl(value.from)
      })
    )
  }

  removeSource(idx) {
    (this.formValue.get('sources') as FormArray).removeAt(idx)
  }

  updateForm(value: GearDefinition) {
    if (this.formValue === undefined) { return }
    this.formValue.setValue(value)
    this._value = { ...this.value }
  }

  reset() {
    this.formValue.reset();
  }
}
