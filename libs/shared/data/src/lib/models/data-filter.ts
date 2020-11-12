import { GearSlot } from './gear-slot';
import { ItemSource } from './item-source';

export interface DataFilter {
    heroFilter: string[]
    searchFilter: string
    itemSourceFilter: ItemSource
    gearSlotFilter: GearSlot[]
    isReadyFilter: boolean
    rarityFilter: string[]
  }