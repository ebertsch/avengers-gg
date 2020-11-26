import { CacheModule, Module } from '@nestjs/common';

import { GuidesController } from './guides.controller';
import { GuidesService } from './guides.service';

@Module({
  imports: [
    CacheModule.register(),
  ],
  controllers: [GuidesController],
  providers: [GuidesService],
})
export class GuidesModule { }
