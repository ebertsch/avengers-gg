import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { DataFilter } from '@avengers-game-guide/shared/data';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { isNil, not } from 'ramda';



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
export class DataFiltersComponent implements OnInit, OnChanges {

  form: FormGroup;
  @Input() filter: DataFilter;
  @Input() config: FiltersConfig = {
    searchFilter: true
  }
  @Output() changed = new EventEmitter<DataFilter>()

  constructor(public heroService: HeroService) { }
  
  ngOnInit(): void {
    this.setupForm();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if(not(isNil(changes.filter.currentValue))) {
      this.updateForm(changes.filter.currentValue)
    }
  }

  setupForm() {
    this.form = new FormGroup({});
    if(this.config.heroFilter) this.form.addControl('heroFilter', new FormControl([]))
    if(this.config.searchFilter) this.form.addControl('searchFilter', new FormControl(null))
    if(this.config.itemSourceFilter) this.form.addControl('itemSourceFilter', new FormGroup({ from: new FormControl(null), type: new FormControl(null)}))
    if(this.config.gearSlotFilter) this.form.addControl('gearSlotFilter', new FormControl([]));
    if(this.config.isReadyFilter) this.form.addControl('isReadyFilter', new FormControl(null));
    if(this.config.rarityFilter) this.form.addControl('rarityFilter', new FormControl([]));


    this.form.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe({
      next: this.emitChangedFilter.bind(this)
    })
  }

  updateForm(filter: DataFilter) {
    this.form.patchValue(filter, { emitEvent: false });
    this.emitChangedFilter(filter);
  }
    
  emitChangedFilter(filter: DataFilter) {
      this.changed.emit(filter);
  }

}

