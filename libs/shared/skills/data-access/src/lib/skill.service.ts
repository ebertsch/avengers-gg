import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { createSelector, select } from '@ngrx/store';

import { Skill } from './skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService extends EntityCollectionServiceBase<Skill> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Skill', serviceElementsFactory);
  }

  private getSkillSelector = (id: string) => createSelector(
    this.selectors.selectEntityMap,
    perks => perks[id]
  );
  getSkill = (id: string) =>  {
    return  this.store.pipe(select(this.getSkillSelector(id)))
  }
}
