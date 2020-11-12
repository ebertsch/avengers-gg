import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GearDefinition, GearService } from '@avengers-game-guide/shared/gear/data-access';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { PerkService } from '@avengers-game-guide/shared/perks/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'aggd-gear-page',
  templateUrl: './gear-page.component.html',
  styleUrls: ['./gear-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GearPageComponent implements OnInit {

  heroFilter: string[];
  searchFilter = '';
  filtered$: Observable<GearDefinition[]>
  selectedItem: string;

  constructor(public perkService: PerkService, public heroService: HeroService, public gearService: GearService) { }

  ngOnInit(): void {
  }

  setFilters() {
    console.log('filter', this.heroFilter, this.searchFilter)
    this.gearService.setFilter({heroIds: this.heroFilter, search: this.searchFilter})
  }

  create(gear: GearDefinition, form: any) {
    this.gearService.add(gear)
    // form.reset();
  }

  save(gear: GearDefinition) {
    this.gearService.update(gear)
  }

  delete(gear: GearDefinition) {
    this.gearService.delete(gear)
  }

}
