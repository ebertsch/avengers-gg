import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DataServiceBase } from '../../data-service-base';
import { IEntity } from 'fireorm';

import { HeroService } from './heroes.service';
import { ToLowerCasePipe } from '../../pipes/to-lowercase.pipe';
import { Hero } from './hero.model';
import { AuthGuard } from '@nestjs/passport';


@Controller()
export class HeroController {
  constructor(private readonly entityService: HeroService) {}

  @Get('heroes')
  async getItems() {
    return await this.entityService.getAll()
  }

  @Get('hero/:heroId')
  async getItem(@Param('heroId', ToLowerCasePipe) heroId: string){
    return await this.entityService.getById(heroId)
  }

  @Post('heroes')
  @UseGuards(AuthGuard('firebase'))
  async addItem(@Body() item: Hero) {
    return await this.entityService.add(item)
  }

  @Delete('heroes/:id')
  @UseGuards(AuthGuard('firebase'))
  async removeItem(@Param('id') id: string) {
    return await this.entityService.remove(id)
  }
}