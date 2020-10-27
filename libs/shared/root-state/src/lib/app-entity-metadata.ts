import { EntityMetadataMap } from '@ngrx/data';
 
const entityMetadata: EntityMetadataMap = {
  Hero: {},
  Gear: {},
  Perk: {},
  Build: {},
  Guide: {},
  Note: {},
  Skill: {}
};
 
const pluralNames = {
    Hero: 'Heroes',
    Gear: 'Gear'
};
 
export const entityConfig = {
  entityMetadata,
  pluralNames
};