import { decompressFromEncodedURIComponent } from '@avengers-game-guide/shared/data';
import { fromPairs } from 'ramda';
import { SerializedGearInstance, GearInstance } from './models/gear-instance';

export class LoadoutDeserializer {
    constructor(loadout: string) {
    }

    hydrateGearInstance(source: string) {
        const decompressed = decompressFromEncodedURIComponent(source)
        const minimalGear = fromPairs(JSON.parse(decompressed)) as unknown as SerializedGearInstance;
        return {
            id: minimalGear.i,
            perk1: minimalGear.p1,
            perk2: minimalGear.p2,
            perk3: minimalGear.p3,
            powerLevel: minimalGear.pl,
            rarity: minimalGear.r,
            stat1: { stat: minimalGear.s1n, value: minimalGear.s1v },
            stat2: { stat: minimalGear.s2n, value: minimalGear.s2v },
            stat3: { stat: minimalGear.s3n, value: minimalGear.s3v }
        } as GearInstance
    }
}