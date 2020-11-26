import { CacheModule, Module } from '@nestjs/common';

import { PerkUsageController } from './perk-usage.controller';
import { PerkUsageService } from './perk-usage.service';

@Module({
  imports: [
    CacheModule.register(),
  ],
  controllers: [PerkUsageController],
  providers: [PerkUsageService],
})
export class PerkUsageModule {}
