import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ToLowerCasePipe } from '../../pipes/to-lowercase.pipe';
import { Notes } from './notes.model';

import { NotesService } from './notes.service';


@Controller()
export class NotesController {
  constructor(private readonly entityService: NotesService) { }

  @Get('notes')
  async getItems(@Query('hero_id', ToLowerCasePipe) heroId: string, @Query('include_wildcard') includeWildcard: boolean) {
    if (!heroId)
      return await this.entityService.getAll()

    let ids = [heroId]
    if (includeWildcard) ids = ids.concat('*')

    return await this.entityService.getByHeroId(ids)
  }

  @Post('note')
  @UseGuards(AuthGuard('firebase'))
  async addItem(@Body() item: Notes) {
    return await this.entityService.add(item)
  }

  @Put('note/:id')
  @UseGuards(AuthGuard('firebase'))
  async changeItem(@Param('id') id: string, @Body() item: Notes) {
    return await this.entityService.update(id, item)
  }


  @Delete('note/:id')
  @UseGuards(AuthGuard('firebase'))
  async removeItem(@Param('id') id: string) {
    return await this.entityService.remove(id)
  }
}