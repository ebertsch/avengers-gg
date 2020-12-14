import { Injectable } from '@nestjs/common';
import { RecognizedForm } from '@azure/ai-form-recognizer'
import { File } from '../../types/file';
import { MLService } from './ml.service';
import { MLModel } from './models';
import { pathOr } from 'ramda';

interface DetectedPerk {
    title: string
    description: string
}

interface DetectedGear {
    name: string,
    powerLevel: number,
    rarity: string,
    perk1: DetectedPerk
    perk2: DetectedPerk
    perk3: DetectedPerk
}

const field = (field, value) => pathOr(null, ['fields', field, 'valueData', 'text'], value)

@Injectable()
export class GearDetectorService {

    constructor(private readonly ml: MLService) {
    }

    async processImage(file: File): Promise<DetectedGear> {
        const result = await this.ml.processImage(file, MLModel.GEAR_DETECTOR)

        const name = field('Name', result)
        const rarity = field('Rarity', result)
        const powerLevel = parseInt(field('Power Level', result), 10)
        const perk1 = this.extractPerk(1, result);
        const perk2 = this.extractPerk(2, result);
        const perk3 = this.extractPerk(3, result);

        return {
            name,
            rarity,
            powerLevel,
            perk1,
            perk2,
            perk3
        }
    }

    private extractPerk(index: number, result: RecognizedForm): DetectedPerk {
        const title = field(`Perk${index} Title`, result)
        const description = field(`Perk${index} Description`, result)
        return { title, description }
    }
}
