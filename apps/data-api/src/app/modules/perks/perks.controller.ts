import { Body, CacheInterceptor, CacheTTL, CACHE_MANAGER, Controller, Get, Inject, Post, Put, Delete, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AuthGuard } from '@nestjs/passport';
import { ToLowerCasePipe } from '../../pipes/to-lowercase.pipe';
import { Perk } from './perk.model';

import { PerkService } from './perk.service';


@Controller()
export class PerksController {
  constructor(
    private readonly entityService: PerkService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache) { }

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

  @Post('perks/index')
  @UseGuards(AuthGuard('firebase'))
  async indexData(){
    this.entityService.index(['title', 'description'])
  }

  @Get('perk/:id')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60 * 5)
  async getItemDetail(@Param('id') id: string) {
    return this.entityService.getById(id)
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
}