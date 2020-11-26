import { Body, CacheInterceptor, CacheTTL, CACHE_MANAGER, Controller, Get, Inject, Post, Put, Delete, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AuthGuard } from '@nestjs/passport';
import { ShortUrls } from './short-urls.model';

import { ShortUrlsService } from './short-urls.service';


@Controller()
export class ShortUrlsController {
  constructor(private readonly entityService: ShortUrlsService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Get('shortUrls')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60 * 5)
  async getItems() {
    return await this.entityService.getAll()
  }

  @Post('shortUrl')
  async addItem(@Body() item: ShortUrls) {
    await this.cacheManager.reset()
    return await this.entityService.add(item)
  }
  
  @Delete('shortUrl/:id')
  @UseGuards(AuthGuard('firebase'))
  async removeItem(@Param('id') id: string) {
    await this.cacheManager.reset()
    return await this.entityService.remove(id)
  }
}