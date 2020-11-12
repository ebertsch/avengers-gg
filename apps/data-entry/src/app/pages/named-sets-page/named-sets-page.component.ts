import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataFilter, ItemSource } from '@avengers-game-guide/shared/data';
import { GearService } from '@avengers-game-guide/shared/gear/data-access';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { NamedSet, NamedSetService } from '@avengers-game-guide/shared/named-sets/data-access'
import { Observable } from 'rxjs';

@Component({
  selector: 'aggd-named-sets-page',
  templateUrl: './named-sets-page.component.html',
  styleUrls: ['./named-sets-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NamedSetsPageComponent implements OnInit {

  heroFilter: any;
  filtered$: Observable<NamedSet[]>

  constructor(public namedSetService: NamedSetService, public heroService: HeroService, public gearService: GearService) { }

  ngOnInit(): void {
  }

  getSourceLocations(sources: ItemSource[]) {
    return (sources || []).map(s => s.from).join(', ')
  }

  applyFilters(filter: DataFilter) {
    this.namedSetService.setFilter(filter);
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
