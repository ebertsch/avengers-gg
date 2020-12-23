import { CacheModule, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express'
import { PerksController } from './perks.controller';
import { PerkService } from './perk.service';

@Module({
  imports: [
    CacheModule.register(),
    MulterModule,
  ],
  controllers: [PerksController],
  providers: [PerkService],
  exports: [PerkService]
})
export class PerksModule {}
