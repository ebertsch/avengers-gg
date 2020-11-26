import { Body, CacheInterceptor, CacheTTL, CACHE_MANAGER, Controller, Get, Inject, Post, Put, Delete, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AuthGuard } from '@nestjs/passport';
import { ToLowerCasePipe } from '../../pipes/to-lowercase.pipe';
import { Gear } from './gear.model';

import { GearService } from './gear.service';


@Controller()
export class GearController {
  constructor(private readonly entityService: GearService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Get('gear')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60 * 5)
  async getItems(@Query('hero_id', ToLowerCasePipe) heroId: string, @Query('include_wildcard') includeWildcard: boolean) {
    if(!heroId)
      return await this.entityService.getAll()

    let ids = [heroId]
    if (includeWildcard) ids = ids.concat('*')
    
    return await this.entityService.getByHeroId(ids)
  }

  @Post('gear')
  @UseGuards(AuthGuard('firebase'))
  async addItem(@Body() item: Gear) {
    await this.cacheManager.reset()
    return await this.entityService.add(item)
  }

  @Put('gear/:id')
  @UseGuards(AuthGuard('firebase'))
  async changeItem(@Param('id') id: string, @Body() item: Gear) {
    await this.cacheManager.reset()
    return await this.entityService.update(id, item)
  }

  @Delete('gear/:id')
  @UseGuards(AuthGuard('firebase'))
  async removeItem(@Param('id') id: string) {
    await this.cacheManager.reset()
    return await this.entityService.remove(id)
  }
}