import { Body, CacheInterceptor, CacheTTL, CACHE_MANAGER, Controller, Get, Inject, Post, Put, Delete, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { DataServiceBase } from '../../data-service-base';
import { IEntity } from 'fireorm';

import { HeroService } from './heroes.service';
import { ToLowerCasePipe } from '../../pipes/to-lowercase.pipe';
import { Hero } from './hero.model';
import { AuthGuard } from '@nestjs/passport';


@Controller()
export class HeroController {
  constructor(private readonly entityService: HeroService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Get('heroes')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60 * 5)
  async getItems() {
    return await this.entityService.getAll()
  }

  @Get('hero/:heroId')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60 * 5)
  async getItem(@Param('heroId', ToLowerCasePipe) heroId: string){
    return await this.entityService.getById(heroId)
  }

  @Post('heroes')
  @UseGuards(AuthGuard('firebase'))
  async addItem(@Body() item: Hero) {
    await this.cacheManager.reset()
    return await this.entityService.add(item)
  }

  @Delete('heroes/:id')
  @UseGuards(AuthGuard('firebase'))
  async removeItem(@Param('id') id: string) {
    await this.cacheManager.reset()
    return await this.entityService.remove(id)
  }
}