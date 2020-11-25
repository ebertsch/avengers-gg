import { Module } from '@nestjs/common';

import { ShortUrlsController } from './short-urls.controller';
import { ShortUrlsService } from './short-urls.service';

@Module({
  imports: [],
  controllers: [ShortUrlsController],
  providers: [ShortUrlsService],
})
export class ShortUrlsModule {}
