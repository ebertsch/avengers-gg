import { Injectable } from '@nestjs/common';
import { RecognizedForm } from '@azure/ai-form-recognizer'
import { File } from '../../models/file';
import { MLService } from './ml.service';
import { MLModel } from './models';
import { match, pathOr, reduce } from 'ramda';
import { PerkService } from '../perks/perk.service';
import { GearService } from '../gear/gear.service';
import { Gear } from '../gear/gear.model';

interface DetectedGearPerk {
    title: string
    description: string
    values: [string, number][]
}

interface DetectedGearAttributes {
    name: string
    powerLevel: number
    rarity: string
}

interface DetectionResult {
    gear: DetectedGearAttributes
    perks: {
        perk1: DetectedGearPerk
        perk2: DetectedGearPerk
        perk3: DetectedGearPerk
    }
}


const field = <T>(field, value) => pathOr<T>(null, ['fields', field, 'valueData', 'text'], value)

@Injectable()
export class GearDetectorService {

    constructor(private readonly ml: MLService, private perksService: PerkService, private gearService: GearService) {
    }

    async processImage(file: File): Promise<DetectionResult> {
        const result = await this.ml.processImage(file, MLModel.GEAR_DETECTOR)

        const gear = await this.extractGear(result)
        const perks = await this.extractPerks(result)

        return { gear, perks }
    }

    private async extractGear(result: RecognizedForm) {
        const name = field<string>('Name', result)
        const rarity = field<string>('Rarity', result).toLowerCase()
        const powerLevel = parseInt(field('Power Level', result), 10)
        const detectedGear: DetectedGearAttributes = {
            name,
            rarity,
            powerLevel,
        }
        return detectedGear
    }

    private async extractPerks(result: RecognizedForm) {
        const perk1 = await this.extractPerk(1, result);
        const perk2 = await this.extractPerk(2, result);
        const perk3 = await this.extractPerk(3, result);
        return {
            perk1,
            perk2,
            perk3
        }
    }

    private async extractPerk(index: number, result: RecognizedForm): Promise<DetectedGearPerk> {
        const title = field<string>(`Perk${index} Title`, result)
        const rawDescription = field<string>(`Perk${index} Description`, result) as string
        const description = this.perksService.tokenizeDescription(rawDescription);
        const values = this.perksService.getDescriptionTokenValues(rawDescription)
        const detectedResult = { title, description, values }

        return detectedResult
    }
}
