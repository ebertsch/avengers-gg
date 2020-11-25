import { Module } from '@nestjs/common';

import { BuildsController } from './builds.controller';
import { BuildsService } from './builds.service';

@Module({
  imports: [],
  controllers: [BuildsController],
  providers: [BuildsService],
})
export class BuildsModule {}
