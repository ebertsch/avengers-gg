import { UploadedFile, Controller, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'

import { File } from '../../types/file';
import { GearDetectorService } from './gear-detector.service';


@Controller()
export class MLController {
    constructor(private readonly gearDetector: GearDetectorService) { }

    @Post('perks/detect')
    @UseInterceptors(FileInterceptor('file'))
    async detectPerks(@UploadedFile() file: File) {
        return this.gearDetector.processImage(file)
    }
}