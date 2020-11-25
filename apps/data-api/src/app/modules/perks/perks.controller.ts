import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ToLowerCasePipe } from '../../pipes/to-lowercase.pipe';
import { PerkUsage } from '../perk-usage';
import { Perk } from './perk.model';

import { PerkService } from './perk.service';


@Controller()
export class PerksController {
  constructor(private readonly entityService: PerkService) {}

  @Get('perks')
  async getItems(@Query('hero_id', ToLowerCasePipe) heroId: string, @Query('include_wildcard') includeWildcard: boolean) {
    if(!heroId)
      return await this.entityService.getAll()

    let ids = [heroId]
    if (includeWildcard) ids = ids.concat('*')
    
    return await this.entityService.getByHeroes(ids)
  }

  @Post('perk')
  @UseGuards(AuthGuard('firebase'))
  async addItem(@Body() item: Perk) {
    return await this.entityService.add(item)
  }

  @Put('perk/:id')
  @UseGuards(AuthGuard('firebase'))
  async changeItem(@Param('id') id: string, @Body() item: Perk) {
    return await this.entityService.update(id, item)
  }

  @Delete('perk/:id')
  @UseGuards(AuthGuard('firebase'))
  async removeItem(@Param('id') id: string) {
    return await this.entityService.remove(id)
  }
}