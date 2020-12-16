import { Body, CacheInterceptor, UploadedFile, CacheTTL, CACHE_MANAGER, Controller, Get, Inject, Post, Put, Delete, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express'
import { ToLowerCasePipe } from '../../pipes/to-lowercase.pipe';
import { PerkUsage } from '../perk-usage';
import { Perk } from './perk.model';
import { FormRecognizerClient, AzureKeyCredential } from '@azure/ai-form-recognizer'

import { PerkService } from './perk.service';
import { assoc } from 'ramda';
import { pipe } from 'rxjs';


@Controller()
export class PerksController {
  constructor(private readonly entityService: PerkService, @Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  @Get('perks')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60 * 5)
  async getItems(@Query('hero_id', ToLowerCasePipe) heroId: string, @Query('include_wildcard') includeWildcard: boolean) {
    if (!heroId)
      return await this.entityService.getAll()

    let ids = [heroId]
    if (includeWildcard) ids = ids.concat('*')

    return await this.entityService.getByHeroes(ids)
  }

  @Post('perk')
  @UseGuards(AuthGuard('firebase'))
  async addItem(@Body() item: Perk) {
    await this.cacheManager.reset()
    return await this.entityService.add(item)
  }

  @Put('perk/:id')
  @UseGuards(AuthGuard('firebase'))
  async changeItem(@Param('id') id: string, @Body() item: Perk) {
    await this.cacheManager.reset()
    return await this.entityService.update(id, item)
  }

  @Delete('perk/:id')
  @UseGuards(AuthGuard('firebase'))
  async removeItem(@Param('id') id: string) {
    await this.cacheManager.reset()
    return await this.entityService.remove(id)
  }

  @Post('perks/detect')
  @UseInterceptors(FileInterceptor('file'))
  async detectPerks(@UploadedFile() file, @Body() body) {

    console.log(file)
    const client = new FormRecognizerClient(
      'https://aveengersgg-gear-recognizer.cognitiveservices.azure.com',
      new AzureKeyCredential('47af3e805ba449d68d1dfffceb74477d')
    );
    const modelId = "68d374ff-c88e-4718-ab9c-b08f8904ca2a";

    const poller = await client.beginRecognizeCustomForms(modelId, file.buffer);
    const forms = await poller.pollUntilDone();
    console.log(forms[0])

    let perk1 = null
    if(forms[0].fields["Perk1 Title"] && forms[0].fields["Perk1 Description"]?.valueData) {
      perk1 = { 
        title: forms[0].fields["Perk1 Title"].value,
        description: forms[0].fields["Perk1 Description"]?.valueData.text,
      }
    } else {
      perk1 = {
        title: null,
        description: null
      }
    }

    let perk2 = null
    if(forms[0].fields["Perk2 Title"] && forms[0].fields["Perk2 Description"]?.valueData) {
      perk2 = { 
        title: forms[0].fields["Perk2 Title"].value,
        description: forms[0].fields["Perk2 Description"]?.valueData.text,
      }
    } else {
      perk2 = {
        title: null,
        description: null
      }
    }

    let perk3 = null
    if(forms[0].fields["Perk3 Title"] && forms[0].fields["Perk3 Description"]?.valueData) {
      perk3 = { 
        title: forms[0].fields["Perk3 Title"].value,
        description: forms[0].fields["Perk3 Description"]?.valueData.text,
      }
    } else {
      perk3 = {
        title: null,
        description: null
      }
    }


    return pipe(
      assoc('perk1', perk1),
      assoc('perk2', perk2),
      assoc('perk3', perk3)
    )({})
  }
}