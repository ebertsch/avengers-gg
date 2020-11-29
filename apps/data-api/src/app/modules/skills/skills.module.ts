import { CacheModule, Module } from '@nestjs/common';

import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';

@Module({
  imports: [
    CacheModule.register(),
  ],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
