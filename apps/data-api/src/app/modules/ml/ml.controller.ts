import { UploadedFile, Controller, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'

import { File } from '../../models/file';
import { GearService } from '../gear/gear.service';
import { PerkService } from '../perks/perk.service';
import { GearDetectorService } from './gear-detector.service';


@Controller()
export class MLController {
    constructor(private readonly gearDetector: GearDetectorService,private gearService: GearService, private perksService: PerkService) { }

    @Post('perks/detect')
    @UseInterceptors(FileInterceptor('file'))
    async detectPerks(@UploadedFile() file: File) {
        return this.gearDetector.processImage(file)
    }

    @Post('gear/process-image')
    @UseInterceptors(FileInterceptor('file'))
    async processImage(@UploadedFile() file: File) {
        const messages: string[] = [];
        const detectionResult = await this.gearDetector.processImage(file)
        const matchedGear = await this.gearService.findCascading({
            name: detectionResult.gear.name
        })
        const matchedPerk1 = await this.perksService.findCascading({
            title: detectionResult.perks.perk1.title,
            description: detectionResult.perks.perk1.description
        })
        const matchedPerk2 = await this.perksService.findCascading({
            title: detectionResult.perks.perk2.title,
            description: detectionResult.perks.perk2.description
        })
        const matchedPerk3 = await this.perksService.findCascading({
            title: detectionResult.perks.perk3.title,
            description: detectionResult.perks.perk3.description
        })

        return {detectionResult, matchedItems: { gear: matchedGear, perk1: matchedPerk1, perk2: matchedPerk2, perk3: matchedPerk3}}
    }
}