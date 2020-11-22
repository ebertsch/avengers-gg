import { StatInstance } from '@avengers-game-guide/shared/data'
import { pathOr, propOr } from 'ramda'
import { GearInstance } from './gear-instance'

export class UserGearInstance {
    id?: string
    definitionId: string
    powerLevel: number
    rarity: string
    stats: [string, string, string]
    perks: [string, string, string]

    constructor(instance: GearInstance) {
        this.definitionId = instance.id
        this.powerLevel = propOr<null, GearInstance, number>(null, 'powerLevel', instance)
        this.rarity = propOr<null, GearInstance, string>(null, 'rarity', instance)
        this.stats = [
            pathOr(null, ['stat1', 'stat'], instance),
            pathOr(null, ['stat2', 'stat'], instance),
            pathOr(null, ['stat3', 'stat'], instance)
        ]
        this.perks = [
            propOr<null, GearInstance, string>(null, 'perk1', instance),
            propOr<null, GearInstance, string>(null, 'perk2', instance),
            propOr<null, GearInstance, string>(null, 'perk3', instance)
        ]
    }
}