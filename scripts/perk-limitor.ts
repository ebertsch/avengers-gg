import { promises as fs } from 'fs'
import { join } from 'path'
import { Perk } from '../libs/shared/perks/data-access/src'
import { GearDefinition } from '../libs/shared/gear/data-access/src'
import { assoc, values, filter, contains, prop, pipe } from 'ramda';

async function loadJsonFromFs<T>(key: string) {
    const jsonBuffer = await fs.readFile(join(__dirname, '../server-json-data', `${key}.json`))
    const data = <{[key: string]: T[]}>JSON.parse(jsonBuffer.toString())
    return values(data[key]) as T[]
}

async function saveDataToFs<T>(key: string, data: T[]) {
    const jsonString = JSON.stringify({ [key]: data })
    await fs.writeFile(join(__dirname, '../server-json-data', `${key}.json`), jsonString)
}

const hasPerkInSlot = (perk: Perk, gear: GearDefinition[], slot: number) => {
    const slotProp = `perks${slot}` as keyof GearDefinition;
    return filter(g => contains(perk.id, (prop(slotProp, g) as string[]||[])) ,gear).length > 0
}

(async () => {
    const perks = await loadJsonFromFs<Perk>('perks')
    const gear = await loadJsonFromFs<GearDefinition>('gear')

    const updated = perks.map( perk => {
        return pipe(
            assoc('slot1Enabled', hasPerkInSlot(perk, gear, 1)),
            assoc('slot2Enabled', hasPerkInSlot(perk, gear, 2)),
            assoc('slot3Enabled', hasPerkInSlot(perk, gear, 3))
        )(perk)
    })
    
    await saveDataToFs('perks', updated);
})()
