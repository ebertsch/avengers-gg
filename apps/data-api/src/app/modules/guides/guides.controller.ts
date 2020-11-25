import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ToLowerCasePipe } from '../../pipes/to-lowercase.pipe';
import { Guides } from './guides.model';

import { GuidesService } from './guides.service';


@Controller()
export class GuidesController {
  constructor(private readonly entityService: GuidesService) { }

  @Get('guides')
  async getItems(@Query('hero_id', ToLowerCasePipe) heroId: string, @Query('include_wildcard') includeWildcard: boolean) {
    if (!heroId)
      return await this.entityService.getAll()

    let ids = [heroId]
    if (includeWildcard) ids = ids.concat('*')

    return await this.entityService.getByHeroId(ids)
  }

  @Post('guide')
  @UseGuards(AuthGuard('firebase'))
  async addItem(@Body() item: Guides) {
    return await this.entityService.add(item)
  }

  @Put('guide/:id')
  @UseGuards(AuthGuard('firebase'))
  async changeItem(@Param('id') id: string, @Body() item: Guides) {
    return await this.entityService.update(id, item)
  }

  @Delete('guide/:id')
  @UseGuards(AuthGuard('firebase'))
  async removeItem(@Param('id') id: string) {
    return await this.entityService.remove(id)
  }
}