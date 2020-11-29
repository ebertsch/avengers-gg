import { Body, CacheInterceptor, CacheTTL, CACHE_MANAGER, Controller, Get, Inject, Post, Put, Delete, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AuthGuard } from '@nestjs/passport';
import { ToLowerCasePipe } from '../../pipes/to-lowercase.pipe';
import { Skills } from './skills.model';

import { SkillsService } from './skills.service';


@Controller()
export class SkillsController {
  constructor(private readonly entityService: SkillsService, @Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  @Get('skills')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60 * 5)
  async getItems(@Query('hero_id', ToLowerCasePipe) heroId: string, @Query('include_wildcard') includeWildcard: boolean) {
    if (!heroId)
      return await this.entityService.getAll()

    let ids = [heroId]
    if (includeWildcard) ids = ids.concat('*')

    return await this.entityService.getByHeroId(ids)
  }

  @Post('skills')
  @UseGuards(AuthGuard('firebase'))
  async addItem(@Body() item: Skills) {
    await this.cacheManager.reset()
    return await this.entityService.add(item)
  }

  @Delete('skills/:id')
  @UseGuards(AuthGuard('firebase'))
  async removeItem(@Param('id') id: string) {
    await this.cacheManager.reset()
    return await this.entityService.remove(id)
  }
}