import { Component, OnInit, ChangeDetectionStrategy, forwardRef, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ItemSource } from '@avengers-game-guide/shared/data';
import { GearDefinition } from '@avengers-game-guide/shared/gear/data-access';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { Perk, PerkService } from '@avengers-game-guide/shared/perks/data-access';
import { concat } from 'ramda';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'aggd-gear-edit-form',
  templateUrl: './gear-edit-form.component.html',
  styleUrls: ['./gear-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'gearEditorForm'
})
export class GearEditFormComponent implements OnInit, OnChanges {
  allowAnyPerkField = new FormControl(false)
  allowAnyPerkSlotField = new FormControl(false)
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

  activeGearSlot$: Observable<string>;
  activeHeroId$: Observable<{id:string}>;

  constructor(public perkService: PerkService, public heroService: HeroService) { }

  ngOnInit(): void {
    this.setupForm()
  }

  ngOnChanges(): void {
    this.updateForm(this._value);
  }

  setupForm() {
    
    this.formValue = new FormGroup({
      id: new FormControl({ value: this.value.id, disabled: true }),
      name: new FormControl(this.value.name),
      heroId: new FormControl(this.value.heroId),
      gearType: new FormControl(this.value.gearType),
      perks1: new FormControl(this.value.perks1),
      perks2: new FormControl(this.value.perks2),
      perks3: new FormControl(this.value.perks3),
      rarity: new FormControl(this.value.rarity),
      stats: new FormArray([]),
      sources: new FormArray([])
    })

    this.activeGearSlot$ = this.formValue.get('gearType').valueChanges.pipe(
      startWith(this.value.gearType)
    )

    this.activeHeroId$ = this.formValue.get('heroId').valueChanges.pipe(
      startWith(this.value.heroId),
      map(id  => ({id}))
    )

    for (let x = 0; x < (this.value.sources || []).length; x++) {
      this.addSource(this.value.sources[x])
    }

    this.value$ = new BehaviorSubject(this.formValue.value)
    this.formValue.valueChanges.subscribe(c => this.value$.next(c))
  }

  get sources() {
    return this.formValue.get('sources') as FormArray
  }

  addSource(value: ItemSource = { type: 'Mission Reward', from: '' }) {
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
