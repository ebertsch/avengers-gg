import { Module } from '@nestjs/common';

import { NamedSetsController } from './named-sets.controller';
import { NamedSetsService } from './named-sets.service';

@Module({
  imports: [],
  controllers: [NamedSetsController],
  providers: [NamedSetsService],
})
export class NamedSetsModule {}
