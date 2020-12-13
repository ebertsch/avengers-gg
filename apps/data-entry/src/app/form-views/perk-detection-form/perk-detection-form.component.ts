import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { PerkDetectionResult, PerkService, Perk } from '@avengers-game-guide/shared/perks/data-access';
import { pick } from 'ramda';

@Component({
  selector: 'aggd-perk-detection-form',
  templateUrl: './perk-detection-form.component.html',
  styleUrls: ['./perk-detection-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerkDetectionFormComponent implements OnInit {
  perks: PerkDetectionResult = null;
  perksForm = new FormGroup({
    heroes: new FormControl(),
    gear: new FormControl(),
    perk1: new FormGroup({
      title: new FormControl(),
      description: new FormControl()
    }),
    perk2: new FormGroup({
      title: new FormControl(),
      description: new FormControl()
    }),
    perk3: new FormGroup({
      title: new FormControl(),
      description: new FormControl()
    })
  })

  constructor(public perkService: PerkService, public heroService: HeroService) { }

  ngOnInit(): void {
  }

  onUploaded(data) {
    this.perks = data;
    this.perksForm.patchValue(data);
  }

  savePerk(form, slot) {
    let perkFields = {
      ...pick(['heroes','gear'], form),
      ...pick(['title', 'description'], form[`perk${slot}`])
    }
    let perk: Perk = {
      ...perkFields,
      [`slot${slot}Enabled`]: true
    } as unknown as Perk
    console.log(perk)
    this.perkService.add(perk)
  }
}
