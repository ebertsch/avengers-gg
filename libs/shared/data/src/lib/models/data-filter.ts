import { GearSlot } from './gear-slot';
import { ItemSource } from './item-source';
import { JSONSchemaObject, JSONSchema } from '@ngx-pwa/local-storage';

export interface DataFilter {
  heroFilter: string[]
  searchFilter: string
  itemSourceFilter: ItemSource
  gearSlotFilter: GearSlot[]
  isReadyFilter: boolean
  rarityFilter: string[]
}
export const DATA_FILTER_SCHEMA: JSONSchema = {
  type: 'object',
  properties: {
    heroFilter: { type: 'array', items: { type: 'string' } },
    searchFilter: { type: 'string' },
    itemSourceFilter: { type: 'object', properties: { from: { type: 'string' }, type: { type: 'string' } } },
    gearSlotFilter: { type: 'array', items: { type: 'string' } },
    isReadyFilter: { type: 'boolean' },
    rarityFilter: { type: 'array', items: { type: 'string' } },
  }
}

export const DEFAULT_FILTER: DataFilter = {
  heroFilter: [],
  searchFilter: null,
  itemSourceFilter: { from: null, type: null },
  gearSlotFilter: [],
  isReadyFilter: null,
  rarityFilter: []
}