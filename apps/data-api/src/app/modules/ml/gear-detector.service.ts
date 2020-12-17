import { Injectable } from '@nestjs/common';
import { RecognizedForm } from '@azure/ai-form-recognizer'
import { File } from '../../types/file';
import { MLService } from './ml.service';
import { MLModel } from './models';
import { match, pathOr, reduce } from 'ramda';
import { PerkService } from '../perks/perk.service';
import { GearService } from '../gear/gear.service';

interface DetectedPerk {
    id?: string
    title: string
    description: string
    values: [string, number][]
}

interface DetectedGear {
    id?: string
    name: string
    powerLevel: number
    rarity: string
    perk1: DetectedPerk
    perk2: DetectedPerk
    perk3: DetectedPerk
}

const field = <T>(field, value) => pathOr<T>(null, ['fields', field, 'valueData', 'text'], value)

@Injectable()
export class GearDetectorService {

    constructor(private readonly ml: MLService, private perksService: PerkService, private gearService: GearService) {
    }

    async processImage(file: File): Promise<DetectedGear> {
        const result = await this.ml.processImage(file, MLModel.GEAR_DETECTOR)

        const name = field<string>('Name', result)
        const rarity = field<string>('Rarity', result)
        const powerLevel = parseInt(field('Power Level', result), 10)
        const perk1 = await this.extractPerk(1, result);
        const perk2 = await this.extractPerk(2, result);
        const perk3 = await this.extractPerk(3, result);
        const detectedResult = {
            name,
            rarity,
            powerLevel,
            perk1,
            perk2,
            perk3
        }

        const matchedGear = await this.gearService.findCascading({ name })

        if (matchedGear) {
            return { id: matchedGear.id, ...detectedResult }
        }
        return detectedResult
    }



    private async extractPerk(index: number, result: RecognizedForm): Promise<DetectedPerk> {
        const title = field<string>(`Perk${index} Title`, result)
        const rawDescription = field<string>(`Perk${index} Description`, result) as string
        const description = this.perksService.tokenizeDescription(rawDescription);
        const values = this.perksService.getDescriptionTokenValues(rawDescription)
        const detectedResult = { title, description, values }

        const matchedPerk = await this.perksService.findCascading({ title, description })

        if (matchedPerk) {
            return { id: matchedPerk.id, ...detectedResult }
        }

        return detectedResult
    }
}
