import { default as got } from 'got'
import { sortBy, reduce, prop, path, map, toLower, assoc, not, isEmpty, mergeRight } from "ramda"
import { join } from 'path'
import { promises as fs } from 'fs'
import { GearResponse } from './gear.type'
import { Gear } from '../libs/shared/gear/data-access/src'
import { Perk } from '../libs/shared/perks/data-access/src'
import { Dictionary } from '@ngrx/entity'
import { ItemSetResponse } from './named-item-set.type'
import { ContentChild } from '@angular/core'

export type DataFile<T> = Dictionary<T[]>

const heroes = [
    [/iron man/, 'ironman'],
    [/captain america/, 'captain'],
    [/ms. marvel/, 'kamala'],
    [/black widow/, 'blackwidow']
]
function fixHeroNames(value: any) {
    return reduce((acc, cur) => acc.replace(cur[0], cur[1]), value, heroes)
}

async function loadPerksFromFS() {
    const perksBuffer = await fs.readFile(join(__dirname, '../server-json-data', 'perks.json'))
    const perksData = <DataFile<Perk>>JSON.parse(perksBuffer.toString())
    const perksDict = reduce((acc, cur) => assoc( cur.title, cur.id, acc ), {}, perksData["perks"])
    return perksDict as Dictionary<string>;
}

async function loadNamedSets() {
    const namedSets = await got("https://api.assemblers.world/items?category=Named%20Sets").json<ItemSetResponse>()
    return reduce((acc,cur) => {
        const items = map(i => {
            if(cur.content.rarity.toLowerCase() == 'exotic') {
                return { [i]: `${cur.name} (exotic)` }
            }
            return { [i]: cur.name }
        } ,cur.content.items)
        return reduce(mergeRight, acc, items );
    },
    {}, namedSets.results) as Dictionary<string>
}

(async () => {
    try {
        const perks = await loadPerksFromFS()
        const namedSets = await loadNamedSets()
        const items = await got("https://api.assemblers.world/items").json<GearResponse>();
        let x = 1
        let newItems: Gear[] = sortBy(prop('name'), map((item) => {
            return {
                id: `g${x++}`,
                name: item.name,
                gearType: item.content.gearCategory,
                perks: map(p => [ perks[p.name]], item.content.perks),
                rarity: item.content.rarity,
                stats: [],
                set: (namedSets[item.name] || "*TDB*").replace('*Name TBD*', '*TBD*'),
                sources: map(s => ({ type: 'Mission Reward', from: s }), item.content.sources || []), 
                heroId: fixHeroNames(toLower(path(['content', 'character'], item) || '*'))
            } as Gear
        }, items.results.filter(
            p => !!p.content.character && p.content.character !== '*' && not(isEmpty(p.content.sources))
        )))

        newItems = newItems.map(i => {
            if (not(isEmpty(i.sources)))
                return i
            
            return assoc('sources', [{ type: 'Global Drop', from: 'Any' }], i) as any
        })

        await fs.writeFile(
            join(__dirname, '../server-json-data', 'gear.json'),
            JSON.stringify({ "gear": newItems })
        )
    } catch (error) {
        console.log('error', error)
    }
})()

