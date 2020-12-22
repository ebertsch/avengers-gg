import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GearService } from '@avengers-game-guide/shared/gear/data-access';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { PerkService } from '@avengers-game-guide/shared/perks/data-access';
import { assoc, contains, includes, match } from 'ramda';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'aggd-gear-detection-form',
  templateUrl: './gear-detection-form.component.html',
  styleUrls: ['./gear-detection-form.component.scss'],
  exportAs: 'gearDetectorForm',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GearDetectionFormComponent implements OnInit {

  result
  form: FormGroup
  activeGearSlot$: Observable<string>;
  activeHeroId$: Observable<{id:string}>;

  get isNewGear() {
    return this.form.value.id
  }

  constructor(public heroService: HeroService, public gearService: GearService, public perkService: PerkService) { }

  ngOnInit(): void {
    this.setupForm()
  }

  onUploaded(file) {
    this.result = file
    if (this.result.matchedItems.gear) {
      this.updateForm(file.matchedItems.gear, file.matchedItems)
    } else {
      this.updateForm(file.detectionResult.gear, file.matchedItems)
    }
  }

  setupForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      heroId: new FormControl(),
      gearType: new FormControl(),
      name: new FormControl(),
      rarity: new FormControl(),
      perks1: new FormControl(),
      perks2: new FormControl(),
      perks3: new FormControl(),
    })

    this.activeGearSlot$ = this.form.get('gearType').valueChanges.pipe(
      startWith(this.form.value.gearType)
    )

    this.activeHeroId$ = this.form.get('heroId').valueChanges.pipe(
      startWith(this.form.value.heroId),
      map(id  => ({id}))
    )
  }

  updateForm(value, matches) {
    let _value = {...value, id: null, perks1: [], perks2: [], perks3: []};

    if(matches.perk1 && !includes(matches.perk1.id, _value.perks1 || [])) {
      const perks = _value.perks1 || []
      perks.push(matches.perk1.id)
      _value = assoc('perks1', perks, _value)
    }
    if(matches.perk2 && !includes(matches.perk2.id, _value.perks2 || [])) {
      const perks = _value.perks2 || []
      perks.push(matches.perk2.id)
      _value = assoc('perks2', perks, _value)
    }
    if(matches.perk3 && !includes(matches.perk3.id, _value.perks3 || [])) {
      const perks = _value.perks3 || []
      perks.push(matches.perk3.id)
      _value = assoc('perks3', perks, _value)
    }
  

    this.form.patchValue(_value)
  }

  saveForm(form) {
    // this.gearService.add()
  }

}
