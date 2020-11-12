import { Component, OnInit, ChangeDetectionStrategy, forwardRef, Input, OnChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { GearSlot, ItemSource } from '@avengers-game-guide/shared/data';
import { GearService } from '@avengers-game-guide/shared/gear/data-access';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { NamedSet, NamedSetService } from '@avengers-game-guide/shared/named-sets/data-access';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'aggd-named-set-edit-form',
  templateUrl: './named-set-edit-form.component.html',
  styleUrls: ['./named-set-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'namedSetEditorForm'
})
export class NamedSetEditFormComponent implements OnInit, OnChanges {
  private _value: NamedSet;
  @Input() set value(value: NamedSet) { this._value = {...value} }
  get value() { return this._value }

  formValue: FormGroup
  value$: BehaviorSubject<NamedSet>;

  constructor(public namedSetService: NamedSetService, public heroService: HeroService, public gearService: GearService) { }

  ngOnInit(): void {
    this.setupForm()  }

  ngOnChanges(): void {
    this.updateForm(this._value);
  }

  setupForm() {
    console.log(this.value)
    this.formValue = new FormGroup({
      id: new FormControl(this.value.id),
      title: new FormControl(this.value.title),
      heroId: new FormControl(this.value.heroId),
      melee: new FormControl(this.value.melee),
      ranged: new FormControl(this.value.ranged),
      defense: new FormControl(this.value.defense),
      heroic: new FormControl(this.value.heroic),
      majorArtifact: new FormControl(this.value.majorArtifact),
      minorArtifact1: new FormControl(this.value.minorArtifact1),
      minorArtifact2: new FormControl(this.value.minorArtifact2),
      sources: new FormArray([])
    })
    for(let x =0; x < (this.value.sources||[]).length; x++){
      this.addSource(this.value.sources[x])
    }
    this.value$ = new BehaviorSubject(this.formValue.value)
    this.formValue.valueChanges.subscribe(c => this.value$.next(c))
  }

  updateForm(value: NamedSet) {
    if(this.formValue === undefined) { return }
    this.formValue.setValue(value)
    this._value = { ...this.value }
  }

  reset() {
    this.formValue.reset();
  }

  setupGear$(gearSlot: GearSlot) {
    return combineLatest([this.value$, this.gearService.entities$]).pipe(
      map(([namedSet, gear]) => 
        gear.filter(g => g.gearType === gearSlot && g.heroId === namedSet.heroId)
      )
    )
  }

  get sources() {
    return this.formValue.get('sources') as FormArray
  }

  addSource(value: ItemSource = { type: '', from: '' }) {
    console.log('v:', value);
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


}
