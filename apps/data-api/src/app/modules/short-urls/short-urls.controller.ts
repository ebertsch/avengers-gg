import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ShortUrls } from './short-urls.model';

import { ShortUrlsService } from './short-urls.service';


@Controller()
export class ShortUrlsController {
  constructor(private readonly entityService: ShortUrlsService) {}

  @Get('shortUrls')
  async getItems() {
    return await this.entityService.getAll()
  }

  @Post('shortUrl')
  async addItem(@Body() item: ShortUrls) {
    return await this.entityService.add(item)
  }
  
  @Delete('shortUrl/:id')
  @UseGuards(AuthGuard('firebase'))
  async removeItem(@Param('id') id: string) {
    return await this.entityService.remove(id)
  }
}