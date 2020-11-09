import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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

  setHeroFilter(e, h) {
    console.log('setting filter', h)
    this.namedSetService.setFilter(h)
  }

  create(namedForm: NamedSet, form: any) {
    this.namedSetService.add(namedForm)
    form.reset();
  }

  save(namedForm: NamedSet) {
    this.namedSetService.update(namedForm)
  }

  delete(namedForm: NamedSet) {
    this.namedSetService.delete(namedForm)
  }

}
