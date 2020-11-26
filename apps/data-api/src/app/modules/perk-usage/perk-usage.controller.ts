import { Body, CacheInterceptor, CacheTTL, CACHE_MANAGER, Controller, Get, Inject, Post, Put, Delete, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ToLowerCasePipe } from '../../pipes/to-lowercase.pipe';
import { PerkUsage } from './perk-usage.model';

import { PerkUsageService } from './perk-usage.service';


@Controller()
export class PerkUsageController {
  constructor(private readonly entityService: PerkUsageService, @Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  @Get('perkUsage')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60 * 5)
  async getItems(@Query('hero_id', ToLowerCasePipe) heroId: string, @Query('include_wildcard') includeWildcard: boolean) {
    if (!heroId)
      return await this.entityService.getAll()

    let ids = [heroId]
    if (includeWildcard) ids = ids.concat('*')

    return await this.entityService.getByHeroId(ids)
  }

  @Post('perkUsage')
  async addItem(@Body() item: PerkUsage) {
    await this.cacheManager.reset()
    return await this.entityService.add(item)
  }
}