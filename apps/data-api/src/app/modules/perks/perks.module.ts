import { CacheModule, Module } from '@nestjs/common';

import { PerksController } from './perks.controller';
import { PerkService } from './perk.service';

@Module({
  imports: [
    CacheModule.register(),
  ],
  controllers: [PerksController],
  providers: [PerkService],
})
export class PerksModule {}
