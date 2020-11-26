import { CacheModule, Module } from '@nestjs/common';

import { ShortUrlsController } from './short-urls.controller';
import { ShortUrlsService } from './short-urls.service';

@Module({
  imports: [
    CacheModule.register(),
  ],
  controllers: [ShortUrlsController],
  providers: [ShortUrlsService],
})
export class ShortUrlsModule {}
