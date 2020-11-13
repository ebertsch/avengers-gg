import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { DataFilter, ItemSource } from '@avengers-game-guide/shared/data';
import { GearService } from '@avengers-game-guide/shared/gear/data-access';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { Perk, PerkService } from '@avengers-game-guide/shared/perks/data-access';
import { Observable } from 'rxjs';

const PERKS_FILTER = 'filters:perks';

@Component({
  selector: 'aggd-perks-page',
  templateUrl: './perks-page.component.html',
  styleUrls: ['./perks-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerksPageComponent implements OnInit {
  filtered$: Observable<Perk[]>
  selectedPerk: string;
  filterObject$: Observable<DataFilter>;

  constructor(public perkService: PerkService, public heroService: HeroService, public gearService: GearService, private storage: StorageMap) {
    this.filterObject$ = this.storage.get(PERKS_FILTER) as Observable<DataFilter>
  }

  ngOnInit(): void {
  }

  applyFilters(filter: DataFilter) {
    this.perkService.setFilter(filter);
    this.storage.set(PERKS_FILTER, filter).subscribe(()=>{})
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
