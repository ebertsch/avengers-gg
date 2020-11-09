import { Component, OnInit, ChangeDetectionStrategy, forwardRef, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { Perk, PerkService } from '@avengers-game-guide/shared/perks/data-access';
import { BehaviorSubject} from 'rxjs';

@Component({
  selector: 'aggd-gear-edit-form',
  templateUrl: './gear-edit-form.component.html',
  styleUrls: ['./gear-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'gearEditorForm'
})
export class GearEditFormComponent implements OnInit, OnChanges {
  private _value: Perk;
  @Input() set value(value: Perk) { this._value = {...value} }
  get value() { return this._value }

  formValue: FormGroup
  value$: BehaviorSubject<Perk>;

  constructor(public perkService: PerkService, public heroService: HeroService) { }

  ngOnInit(): void {
    this.setupForm()  }

  ngOnChanges(): void {
    this.updateForm(this._value);
  }

  setupForm() {
    this.formValue = new FormGroup({
      id: new FormControl(this.value.id),
      title: new FormControl(this.value.title),
      heroes: new FormControl(this.value.heroes),
      description: new FormControl(this.value.description),
      gear: new FormControl(this.value.gear),
      slot1Enabled: new FormControl(this.value.slot1Enabled),
      slot2Enabled: new FormControl(this.value.slot2Enabled),
      slot3Enabled: new FormControl(this.value.slot3Enabled),
      gearSpecific: new FormControl(this.value.gearSpecific),
    })
    this.value$ = new BehaviorSubject(this.formValue.value)
    this.formValue.valueChanges.subscribe(c => this.value$.next(c))
  }

  updateForm(value: Perk) {
    if(this.formValue === undefined) { return }
    this.formValue.setValue(value)
    this._value = { ...this.value }
  }

  reset() {
    this.formValue.reset();
  }
}
