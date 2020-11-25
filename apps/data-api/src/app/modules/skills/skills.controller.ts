import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ToLowerCasePipe } from '../../pipes/to-lowercase.pipe';
import { Skills } from './skills.model';

import { SkillsService } from './skills.service';


@Controller()
export class SkillsController {
  constructor(private readonly entityService: SkillsService) { }

  @Get('skills')
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
    return await this.entityService.add(item)
  }

  @Delete('skills/:id')
  @UseGuards(AuthGuard('firebase'))
  async removeItem(@Param('id') id: string) {
    return await this.entityService.remove(id)
  }
}