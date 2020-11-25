import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ToLowerCasePipe } from '../../pipes/to-lowercase.pipe';
import { PerkUsage } from './perk-usage.model';

import { PerkUsageService } from './perk-usage.service';


@Controller()
export class PerkUsageController {
  constructor(private readonly entityService: PerkUsageService) { }

  @Get('perkUsage')
  async getItems(@Query('hero_id', ToLowerCasePipe) heroId: string, @Query('include_wildcard') includeWildcard: boolean) {
    if (!heroId)
      return await this.entityService.getAll()

    let ids = [heroId]
    if (includeWildcard) ids = ids.concat('*')

    return await this.entityService.getByHeroId(ids)
  }

  @Post('perkUsage')
  async addItem(@Body() item: PerkUsage) {
    return await this.entityService.add(item)
  }
}