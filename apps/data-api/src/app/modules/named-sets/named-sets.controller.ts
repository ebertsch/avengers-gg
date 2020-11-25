import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ToLowerCasePipe } from '../../pipes/to-lowercase.pipe';
import { NamedSets } from './named-sets.model';

import { NamedSetsService } from './named-sets.service';


@Controller()
export class NamedSetsController {
  constructor(private readonly entityService: NamedSetsService) {}

  @Get('namedSets')
  async getItems(@Query('hero_id', ToLowerCasePipe) heroId: string) {
    if(!heroId)
      return await this.entityService.getAll()
    
    return await this.entityService.getByHeroId([heroId])
  }

  @Post('namedSet')
  @UseGuards(AuthGuard('firebase'))
  async addItem(@Body() item: NamedSets) {
    return await this.entityService.add(item)
  }

  @Put('namedSet/:id')
  @UseGuards(AuthGuard('firebase'))
  async changeItem(@Param('id') id: string, @Body() item: NamedSets) {
    return await this.entityService.update(id, item)
  }

  @Delete('namedSet/:id')
  @UseGuards(AuthGuard('firebase'))
  async removeItem(@Param('id') id: string) {
    return await this.entityService.remove(id)
  }
}