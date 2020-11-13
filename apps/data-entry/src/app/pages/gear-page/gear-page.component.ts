import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { DataFilter, ItemSource } from '@avengers-game-guide/shared/data';
import { GearDefinition, GearService } from '@avengers-game-guide/shared/gear/data-access';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { PerkService } from '@avengers-game-guide/shared/perks/data-access';

const GEAR_FILTER = 'filters:gear';

@Component({
  selector: 'aggd-gear-page',
  templateUrl: './gear-page.component.html',
  styleUrls: ['./gear-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GearPageComponent implements OnInit {
  filtered$: Observable<GearDefinition[]>
  selectedItem: string;
  filterObject$: Observable<DataFilter>;
  
  constructor(public perkService: PerkService, public heroService: HeroService, public gearService: GearService, private storage: StorageMap) {
    this.filterObject$ = this.storage.get(GEAR_FILTER) as Observable<DataFilter>
  }
  
  ngOnInit(): void { }
  
  getSourceLocations(sources: ItemSource[]) {
    return (sources || []).map(s => s.from).join(', ')
  }

  applyFilters(filter: DataFilter) {
    this.gearService.setFilter(filter);
    this.storage.set(GEAR_FILTER, filter).subscribe(()=>{})
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
