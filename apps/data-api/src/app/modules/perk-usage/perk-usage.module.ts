import { Module } from '@nestjs/common';

import { PerkUsageController } from './perk-usage.controller';
import { PerkUsageService } from './perk-usage.service';

@Module({
  imports: [],
  controllers: [PerkUsageController],
  providers: [PerkUsageService],
})
export class PerkUsageModule {}
