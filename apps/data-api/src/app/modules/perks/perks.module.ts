import { CacheModule, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express'
import { PerksController } from './perks.controller';
import { PerkService } from './perk.service';
import { MLModule } from '../ml/ml.module';

@Module({
  imports: [
    CacheModule.register(),
    MulterModule,
    MLModule
  ],
  controllers: [PerksController],
  providers: [PerkService],
})
export class PerksModule {}
