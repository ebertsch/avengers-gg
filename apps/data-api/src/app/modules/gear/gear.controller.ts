import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ToLowerCasePipe } from '../../pipes/to-lowercase.pipe';
import { Gear } from './gear.model';

import { GearService } from './gear.service';


@Controller()
export class GearController {
  constructor(private readonly entityService: GearService) {}

  @Get('gear')
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
    return await this.entityService.add(item)
  }

  @Put('gear/:id')
  @UseGuards(AuthGuard('firebase'))
  async changeItem(@Param('id') id: string, @Body() item: Gear) {
    return await this.entityService.update(id, item)
  }

  @Delete('gear/:id')
  @UseGuards(AuthGuard('firebase'))
  async removeItem(@Param('id') id: string) {
    return await this.entityService.remove(id)
  }
}