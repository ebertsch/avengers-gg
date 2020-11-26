import { CacheModule, Module } from '@nestjs/common';

import { NamedSetsController } from './named-sets.controller';
import { NamedSetsService } from './named-sets.service';

@Module({
  imports: [
    CacheModule.register(),
  ],
  controllers: [NamedSetsController],
  providers: [NamedSetsService],
})
export class NamedSetsModule {}
