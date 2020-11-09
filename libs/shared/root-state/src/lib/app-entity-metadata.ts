import { EntityMetadataMap } from '@ngrx/data';

const includesHeroIdsFilter = (entities: {heroId}[], heroIds: string[])=> {
  if(!heroIds || heroIds === []) { return entities }
  return entities.filter(e => heroIds.includes(e.heroId) )
}

const includesHeroIdsAndSearchFilter = (entities: {heroId: string, title:string}[], filter: {heroIds: string[]; search: string})=> {
  let filtered = entities;
  if(!filter) { return filtered }

  console.log('onFilter', filter)
  
  //filter on heroId's
  if(!!filter.heroIds && filter.heroIds.length > 0)
    filtered = filtered.filter(e => filter.heroIds.length && filter.heroIds.includes(e.heroId) )

  if(filter.search !== '')
    filtered = filtered.filter(e => e.title.toLowerCase().indexOf(filter.search.toLowerCase()) > -1)

  return filtered;
}

const entityMetadata: EntityMetadataMap = {
  Hero: {},
  Gear: {
    filterFn: includesHeroIdsFilter
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