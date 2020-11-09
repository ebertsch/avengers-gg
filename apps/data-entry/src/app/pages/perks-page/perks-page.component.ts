import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GearService } from '@avengers-game-guide/shared/gear/data-access';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { Perk, PerkService } from '@avengers-game-guide/shared/perks/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'aggd-perks-page',
  templateUrl: './perks-page.component.html',
  styleUrls: ['./perks-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerksPageComponent implements OnInit {

  heroFilter: any;
  filtered$: Observable<Perk[]>
  selectedPerk: string;

  constructor(public perkService: PerkService, public heroService: HeroService, public gearService: GearService) { }

  ngOnInit(): void {
  }

  setHeroFilter(e, h) {
    this.perkService.setFilter(h)
  }

  create(perk: Perk, form: any) {
    this.perkService.add(perk)
    form.reset();
  }

  save(perk: Perk) {
    this.perkService.update(perk)
  }

  delete(perk: Perk) {
    this.perkService.delete(perk)
  }

}
