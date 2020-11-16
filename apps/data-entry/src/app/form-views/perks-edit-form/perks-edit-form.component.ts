import { flatten } from '@angular/compiler';
import { Component, OnInit, ChangeDetectionStrategy, forwardRef, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GearDefinition, GearService } from '@avengers-game-guide/shared/gear/data-access';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { Perk, PerkService } from '@avengers-game-guide/shared/perks/data-access';
import { values, pick, map as rmap, reduce, filter, contains, uniq } from 'ramda';
import { BehaviorSubject } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'aggd-perks-edit-form',
  templateUrl: './perks-edit-form.component.html',
  styleUrls: ['./perks-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'perkEditorForm'
})
export class PerksEditFormComponent implements OnInit, OnChanges {
  private _value: Perk;
  @Input() set value(value: Perk) { this._value = { ...value } }
  get value() { return this._value }

  formValue: FormGroup
  value$: BehaviorSubject<Perk>;

  gear: GearDefinition[] = [];
  constructor(public perkService: PerkService, public heroService: HeroService, public gearService: GearService) {
    this.gearService.entities$.pipe(
      takeWhile(() => this.gear !== []),
    ).subscribe(x => this.gear = x);
  }

  ngOnInit(): void {
    this.setupForm()
  }

  ngOnChanges(): void {
    this.updateForm(this._value);
  }

  setupForm() {
    this.formValue = new FormGroup({
      id: new FormControl({ value: this.value.id, disabled: true }),
      title: new FormControl(this.value.title),
      heroes: new FormControl(this.value.heroes),
      description: new FormControl(this.value.description),
      gear: new FormControl(this.value.gear),
      slot1Enabled: new FormControl(this.value.slot1Enabled),
      slot2Enabled: new FormControl(this.value.slot2Enabled),
      slot3Enabled: new FormControl(this.value.slot3Enabled),
      gearSpecific: new FormControl(this.value.gearSpecific),
      isReady: new FormControl(this.value.isReady),
    })
    this.value$ = new BehaviorSubject(this.formValue.value)
    this.formValue.valueChanges.subscribe(c => this.value$.next(c))
  }

  updateForm(value: Perk) {
    if (this.formValue === undefined) { return }
    this.formValue.setValue(value)
    this._value = { ...this.value }
  }

  reset() {
    this.formValue.reset();
  }

  // Information Methods
  onGearCount(perk: Perk, gear: GearDefinition[], slots = ['perks1', 'perks2', 'perks3']) {
    const usedPerkIds = rmap(i => flatten(values(pick(slots, i) as any)) as string[], gear)
    if ((gear || []).length < 1) return 0;

    return reduce((acc, cur) => acc + (cur.indexOf(perk.id) > -1 ? 1 : 0), 0, usedPerkIds)
  }

  appearsForHero(perk: Perk, gear: GearDefinition[]) {
    if ((gear || []).length < 1) return [];
    const usedOnGear = filter(
      g => {
        const a = contains(perk.id, g.perks1 || []) || contains(perk.id, g.perks2 || []) || contains(perk.id, g.perks3 || []);
        return a;
      }, gear)
    const usedBy = uniq(rmap(i => i.heroId, usedOnGear))

    return usedBy
  }

  setPerkForAll() {
    this.formValue.patchValue({ heroes: ['*'] })
  }
  setPerkForSelect(heroes: string[]) {
    this.formValue.patchValue({ heroes })
  }
  limitToSlot(slot: number) {
    switch (slot) {
      case 1:
        this.formValue.patchValue({ slot1Enabled: true })
        break;
      case 2:
        this.formValue.patchValue({ slot2Enabled: true })
        break;
      case 3:
        this.formValue.patchValue({ slot3Enabled: true })
        break;
    }

  }
}
