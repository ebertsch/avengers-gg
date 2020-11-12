import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataFilter } from '@avengers-game-guide/shared/data';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';



export interface FiltersConfig {
  heroFilter?: boolean
  itemSourceFilter?: boolean
  searchFilter?: boolean
  gearSlotFilter?: boolean
  isReadyFilter?: boolean
  rarityFilter?: boolean
}

@Component({
  selector: 'aggd-data-filters',
  templateUrl: './data-filters.component.html',
  styleUrls: ['./data-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataFiltersComponent implements OnInit {

  form: FormGroup;
  @Input() config: FiltersConfig = {
    heroFilter: true,
    searchFilter: true
  }
  @Output() changed = new EventEmitter<DataFilter>()

  constructor(public heroService: HeroService) {
  }
  
  ngOnInit(): void {
    this.setupForm();
  }

  setupForm() {
    this.form = new FormGroup({});
    if(this.config.heroFilter) this.form.addControl('heroFilter', new FormControl(null))
    if(this.config.searchFilter) this.form.addControl('searchFilter', new FormControl(''))
    if(this.config.itemSourceFilter) this.form.addControl('itemSourceFilter', new FormGroup({ from: new FormControl(null), type: new FormControl(null)}))
    if(this.config.gearSlotFilter) this.form.addControl('gearSlotFilter', new FormControl(null));
    if(this.config.isReadyFilter) this.form.addControl('isReadyFilter', new FormControl(null));
    if(this.config.rarityFilter) this.form.addControl('rarityFilter', new FormControl(null));


    this.form.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe({
      next: this.emitChangedFilter.bind(this)
    })
  }
    
    
  emitChangedFilter(filters: DataFilter) {
      this.changed.emit(filters);
  }

}

