import { CacheModule, Module } from '@nestjs/common';

import { GearController } from './gear.controller';
import { GearService } from './gear.service';

@Module({
  imports: [
    CacheModule.register(),
  ],
  controllers: [GearController],
  providers: [GearService],
})
export class GearModule { }
