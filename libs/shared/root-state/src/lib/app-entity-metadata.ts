import { EntityMetadataMap } from '@ngrx/data';
import { intersection } from 'ramda';

const includesHeroIdsFilter = (entities: {heroId}[], heroIds: string[])=> {
  if(!heroIds || heroIds === []) { return entities }
  return entities.filter(e => heroIds.includes(e.heroId) )
}

const includesHeroAndSearchFilter = (entities: {heroId: string, name:string}[], filter: {heroIds: string[]; search: string})=> {
  let filtered = entities;
  if(!filter) { return filtered }

  //filter on heroId's
  if(!!filter.heroIds && filter.heroIds.length > 0)
    filtered = filtered.filter(e => filter.heroIds.length && filter.heroIds.includes(e.heroId) )

  if(filter.search !== '')
    filtered = filtered.filter(e => e.name.toLowerCase().indexOf(filter.search.toLowerCase()) > -1)

  return filtered;
}

const includesHeroIdsAndSearchFilter = (entities: {heroes: string[], title:string}[], filter: {heroIds: string[]; search: string})=> {
  let filtered = entities;
  if(!filter) { return filtered }

  //filter on heroId's
  if(!!filter.heroIds && filter.heroIds.length > 0)
    filtered = filtered.filter(e => intersection(filter.heroIds, e.heroes || [] ).length > 0)

  if(filter.search !== '')
    filtered = filtered.filter(e => e.title.toLowerCase().indexOf(filter.search.toLowerCase()) > -1)

  return filtered;
}

const entityMetadata: EntityMetadataMap = {
  Hero: {},
  Gear: {
    filterFn: includesHeroAndSearchFilter
  },
  Perk: {
    filterFn: includesHeroIdsAndSearchFilter
  },
  Build: {
    filterFn: includesHeroIdsFilter
  },
  Guide: {
    filterFn: includesHeroIdsFilter
  },
  Note: {
    filterFn: includesHeroIdsFilter
  },
  Skill: {
    filterFn: includesHeroIdsFilter
  },
  NamedSet: {
    filterFn: includesHeroIdsFilter
  }
};
 
const pluralNames = {
    Hero: 'Heroes',
    Gear: 'Gear'
};
 
export const entityConfig = {
  entityMetadata,
  pluralNames
};