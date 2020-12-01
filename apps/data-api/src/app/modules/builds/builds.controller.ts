import { Body, CacheInterceptor, CacheTTL, CACHE_MANAGER, Controller, Get, Inject, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AuthGuard } from '@nestjs/passport';
import { ToLowerCasePipe } from '../../pipes/to-lowercase.pipe';
import { Builds } from './builds.model';

import { BuildsService } from './builds.service';


@Controller()
export class BuildsController {
  constructor(private readonly entityService: BuildsService, @Inject(CACHE_MANAGER) private cacheManager: Cache) { }
  
  @Get('builds')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60 * 5)
  async getItems(@Query('hero_id', ToLowerCasePipe) heroId: string, @Query('include_wildcard') includeWildcard: boolean) {
    if (!heroId)
      return await this.entityService.getAll()

    let ids = [heroId]
    if (includeWildcard) ids = ids.concat('*')

    return await this.entityService.getByHeroId(ids)
  }

  @Post('builds')
  @UseGuards(AuthGuard('firebase'))
  async addItem(@Body() item: Builds) {
    await this.cacheManager.reset()
    return await this.entityService.add(item)
  }
}