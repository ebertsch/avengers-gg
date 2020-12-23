import { UploadedFile, Controller, Post, UseInterceptors, Get, Query, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'

import { File } from '../../models/file';
import { GearService } from '../gear/gear.service';
import { PerkService } from '../perks/perk.service';
import { GearDetectorService } from './gear-detector.service';
import got, { Got } from 'got';
import { Response } from 'express';


@Controller()
export class MLController {
    constructor(private readonly gearDetector: GearDetectorService,private gearService: GearService, private perksService: PerkService) { }

    @Get('image-proxy')
    async getImage(@Query('url') url: string, @Res() res: Response) {
        const data  = (await got(url));
        // console.log(data)
        // imageResult.rawBody
        // return response.rawBody
        // res.writeHead(200, {
        //     'Content-Type': 'image/*',
        //     'Content-Disposition': 'attachment; filename=proxy-image.png',
        //     'Content-Length': data.length
        //   });
        // res.end(data.buffer);
        
        // data.headers["content-length"]
        res.writeHead(200, { 
            'Content-Type': data.headers["content-type"],
            'Content-Length': data.headers["content-length"]
         })
        res.end(data.rawBody)
        return data.rawBody.buffer
    }

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