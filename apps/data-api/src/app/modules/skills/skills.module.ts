import { Module } from '@nestjs/common';

import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';

@Module({
  imports: [],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
