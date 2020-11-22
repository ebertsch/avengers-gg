import { EntityMetadataMap } from '@ngrx/data';
import { standardFilter } from './standard-data-filter'


const entityMetadata: EntityMetadataMap = {
  Hero: {},
  Gear: { filterFn: standardFilter },
  Perk: { filterFn: standardFilter },
  Build: { filterFn: standardFilter },
  Guide: { filterFn: standardFilter },
  Note: { filterFn: standardFilter },
  Skill: { filterFn: standardFilter },
  NamedSet: { filterFn: standardFilter },
  PerkUsage: {},
  ShortUrl: {},
};

const pluralNames = {
  Hero: 'Heroes',
  Gear: 'Gear',
  PerkUsage: 'PerkUsage'
};

export const entityConfig = {
  entityMetadata,
  pluralNames
};