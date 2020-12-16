import { Injectable } from '@nestjs/common';
import { RecognizedForm } from '@azure/ai-form-recognizer'
import { File } from '../../types/file';
import { MLService } from './ml.service';
import { MLModel } from './models';
import { match, pathOr, reduce } from 'ramda';

interface DetectedPerk {
    title: string
    description: string
    values: [string, number][]
}

interface DetectedGear {
    name: string,
    powerLevel: number,
    rarity: string,
    perk1: DetectedPerk
    perk2: DetectedPerk
    perk3: DetectedPerk
}

const field = <T>(field, value) => pathOr<T>(null, ['fields', field, 'valueData', 'text'], value)
const NUMBERS_REGEX = /\-?\d{1,}\.?\d*%?/gm

@Injectable()
export class GearDetectorService {

    constructor(private readonly ml: MLService) {
    }

    async processImage(file: File): Promise<DetectedGear> {
        const result = await this.ml.processImage(file, MLModel.GEAR_DETECTOR)

        const name = field<string>('Name', result)
        const rarity = field<string>('Rarity', result)
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
        const title = field<string>(`Perk${index} Title`, result)
        const rawDescription = field<string>(`Perk${index} Description`, result) as string

        const matches = rawDescription.match(NUMBERS_REGEX)
        let description = rawDescription
        
        if (matches) {
            description = reduce((a, c) => {
                const token = c.indexOf('%') > -1 ? '%': 'X'
                return a.replace(c, `[${token}]`)
            }, description, matches)
        }

        const _values = Array.from(matches || []);
        const values = _values.map(x=>[x, parseInt(x)] as [string, number])

        return { title, description, values }
    }
}
