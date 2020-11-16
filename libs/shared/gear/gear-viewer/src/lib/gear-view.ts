import { StatInstance } from '@avengers-game-guide/shared/data'
import { GearDefinition, GearInstance } from '@avengers-game-guide/shared/gear/data-access'
import { prop } from 'ramda'

export class GearView {
    id: string
    rarity: string
    powerLevel?: number
    type: string
    stat1?: StatInstance
    stat2?: StatInstance
    stat3?: StatInstance
    perks1: string | string[];
    perks2: string | string[];
    perks3: string | string[];

    isGearDefinition(value: GearDefinition | GearInstance): value is GearDefinition {
        return (<GearDefinition>value).perks1 !== undefined;
    }

    hasPerkVariants(slot: 1|2|3) {
        const propName = `perks${slot}` as keyof GearView
        const perkField = prop(propName, this) as string
        return Array.isArray(perkField)
    }

    constructor(value: GearDefinition | GearInstance) {
        if(this.isGearDefinition(value)) {
            this.type = value.gearType
            this.perks1 = value.perks1
            this.perks2 = value.perks2
            this.perks3 = value.perks3
        } else {
            this.powerLevel = value.powerLevel
            this.stat1 = value.stat1
            this.stat2 = value.stat2
            this.stat3 = value.stat3
            this.perks1 = value.perk1
            this.perks2 = value.perk2
            this.perks3 = value.perk3
        }
        this.id = value.id
        this.rarity = value.rarity
    }
}