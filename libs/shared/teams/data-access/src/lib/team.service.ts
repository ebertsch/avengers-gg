import { Injectable } from "@angular/core";
import { StorageMap } from '@ngx-pwa/local-storage';
import { LocalStorageServiceBase } from './local-storage-service-base';

interface Build {
    id: string,
    name: string,
    loadout: string,
    skills: string
}

@Injectable({
    providedIn: 'root'
})
export class TeamService extends LocalStorageServiceBase<Build> {
    
    constructor(storage: StorageMap) {
        super(storage)
      }
}