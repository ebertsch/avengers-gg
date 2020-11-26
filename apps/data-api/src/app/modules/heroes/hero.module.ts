import { CacheModule, Module } from '@nestjs/common';

import { HeroController } from './hero.controller';
import { HeroService } from './heroes.service';

@Module({
  imports: [
    CacheModule.register(),
  ],
  controllers: [HeroController],
  providers: [HeroService],
})
export class HeroModule {}
