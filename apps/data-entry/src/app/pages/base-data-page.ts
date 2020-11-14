import { Component, OnInit } from '@angular/core';
import { EntityCollectionServiceBase } from '@ngrx/data'
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { DataFilter, ItemSource } from '@avengers-game-guide/shared/data';

@Component({ template: '' })
export abstract class BaseDataPage<T> implements OnInit {
    abstract FILTER_KEY: string;
    filteredItems$: Observable<T[]>
    filterObject$: Observable<DataFilter>;
    selectedItem: string;

    constructor(private storage: StorageMap, public primaryDataService: EntityCollectionServiceBase<T>) { }
    
    ngOnInit(){
        this.filterObject$ = this.storage.get(this.FILTER_KEY) as Observable<DataFilter>
        this.filteredItems$ = this.primaryDataService.filteredEntities$
    }

    public byId(idx:number, item: T & {id: string}) { return item.id }

    toHumanReadableArray(items: T[], sel: (T)=>string = (item)=>item) {
        return (items || []).map(sel).join(', ')
    }

    getSourceLocations(sources: ItemSource[]) {
        return (sources || []).map(s => s.from).join(', ')
    }

    applyFilters(filter: DataFilter) {
        this.primaryDataService.setFilter(filter);
        this.storage.set(this.FILTER_KEY, filter).subscribe(() => { })
    }

    create(dataItem: T, form: any) {
        this.primaryDataService.add(dataItem)
    }

    save(dataItem: T) {
        this.primaryDataService.update(dataItem)
    }

    publish(dataItem: T) {
        this.save({...dataItem, isReady: true})
    }

    delete(dataItem: T) {
        this.primaryDataService.delete(dataItem)
    }

}
