import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { DataFilter, ItemSource } from '@avengers-game-guide/shared/data';
import { GearService } from '@avengers-game-guide/shared/gear/data-access';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { NamedSet, NamedSetService } from '@avengers-game-guide/shared/named-sets/data-access'

const NAMEDSET_FILTER = 'filters:named-set';


@Component({
  selector: 'aggd-named-sets-page',
  templateUrl: './named-sets-page.component.html',
  styleUrls: ['./named-sets-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NamedSetsPageComponent implements OnInit {
  filtered$: Observable<NamedSet[]>
  filterObject$: Observable<DataFilter>;


  constructor(public namedSetService: NamedSetService, public heroService: HeroService, public gearService: GearService, private storage: StorageMap) {
    this.filterObject$ = this.storage.get(NAMEDSET_FILTER) as Observable<DataFilter>

  }

  ngOnInit(): void {
  }

  getSourceLocations(sources: ItemSource[]) {
    return (sources || []).map(s => s.from).join(', ')
  }

  applyFilters(filter: DataFilter) {
    this.namedSetService.setFilter(filter);
    this.storage.set(NAMEDSET_FILTER, filter).subscribe(() => { })

  }

  create(namedForm: NamedSet, form: any) {
    this.namedSetService.add(namedForm)
  }

  save(namedForm: NamedSet) {
    this.namedSetService.update(namedForm)
  }

  delete(namedForm: NamedSet) {
    this.namedSetService.delete(namedForm)
  }

}
