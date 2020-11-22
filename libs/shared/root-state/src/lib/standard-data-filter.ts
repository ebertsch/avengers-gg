import { intersection, has, includes, contains, join, compose, props } from 'ramda';
import { DataFilter } from '@avengers-game-guide/shared/data';


export const standardFilter = (entities: any[], filter: DataFilter) => {
    let filtered = entities;
  
    // filter on Search Text
    if (has('searchFilter', filter) && (filter.searchFilter !== '' && !!filter.searchFilter)) {
      filtered = filtered.filter(e => {
  
        const getSearchText = compose(join(' '), props(['title', 'name', 'description']));
        const text = getSearchText(e).toLowerCase()
        return contains(filter.searchFilter.toLowerCase(), text)
      })
    }
  
    // filter on HeroIds
    if (filter.heroFilter && filter.heroFilter.length > 0) {
      filtered = filtered.filter(e => {
        if (has('heroId', e)) return filter.heroFilter.includes(e.heroId)
        if (has('heroes', e)) return intersection(filter.heroFilter, e.heroes || []).length > 0
        return false
      })
    }
  
    // filter on gearSlot
    if (filter.gearSlotFilter && filter.gearSlotFilter.length > 0) {
      filtered = filtered.filter(e => {
        if (has('gearType', e)) return filter.gearSlotFilter.includes(e.gearType)
        if (has('gear', e)) return intersection(filter.gearSlotFilter, e.gear || []).length > 0
        return false
      })
    }
  
    // filter on isReady
    if (has('isReadyFilter', filter) && filter.isReadyFilter !== null) {
      filtered = filtered.filter( i => !!i.isReady === filter.isReadyFilter )
    }
  
    // filter on rarity
    if (has('rarityFilter', filter) && filter.rarityFilter !== null) {
      filtered = filtered.filter(e => {
        if (has('rarity', e)) return filter.rarityFilter.includes(e.rarity)
        return false;
      })
    }
  
    // filter on itemSource
    if (has('itemSourceFilter', filter) && (filter.itemSourceFilter.from !== null  && filter.itemSourceFilter.type !== null)) {
      filtered = filtered.filter(e => {
        if (has('sources', e)) {
          const hasItem = includes(filter.itemSourceFilter, e.sources)
          return hasItem;
        }
        return false;
      })
    }
  
    return filtered
  }
  