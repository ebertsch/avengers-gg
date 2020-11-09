import { EntityMetadataMap } from '@ngrx/data';

const includesHeroIdsFilter = (entities: {heroId}[], heroIds: string[])=> {
  if(!heroIds || heroIds === []) { return entities }
  return entities.filter(e => heroIds.includes(e.heroId) )
}

const entityMetadata: EntityMetadataMap = {
  Hero: {},
  Gear: {
    filterFn: includesHeroIdsFilter
  },
  Perk: {
    filterFn: includesHeroIdsFilter
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