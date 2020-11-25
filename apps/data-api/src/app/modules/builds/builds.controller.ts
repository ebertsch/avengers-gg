import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ToLowerCasePipe } from '../../pipes/to-lowercase.pipe';
import { Builds } from './builds.model';

import { BuildsService } from './builds.service';


@Controller()
export class BuildsController {
  constructor(private readonly entityService: BuildsService) { }

  @Get('builds')
  async getItems(@Query('hero_id', ToLowerCasePipe) heroId: string, @Query('include_wildcard') includeWildcard: boolean) {
    if (!heroId)
      return await this.entityService.getAll()

    let ids = [heroId]
    if (includeWildcard) ids = ids.concat('*')

    return await this.entityService.getByHeroId(ids)
  }

  @Post('builds')
  @UseGuards(AuthGuard('firebase'))
  async addItem(@Body() item: Builds) {
    return await this.entityService.add(item)
  }
}