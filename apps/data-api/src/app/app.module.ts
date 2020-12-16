import { CacheModule, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express'
import { AuthModule } from './auth/auth.module';

import { FirebaseModule } from './firebase';
import { BuildsModule } from './modules/builds';
import { GearModule } from './modules/gear/gear.module';
import { GuidesModule } from './modules/guides';
import { HeroModule } from './modules/heroes/hero.module';
import { NamedSetsModule } from './modules/named-sets';
import { NotesModule } from './modules/notes';
import { PerkUsageModule } from './modules/perk-usage';
import { PerksModule } from './modules/perks/perks.module';
import { ShortUrlsModule } from './modules/short-urls';
import { SkillsModule } from './modules/skills';

@Module({
  imports: [
    FirebaseModule.forRoot(),
    AuthModule,
    BuildsModule,
    GearModule,
    GuidesModule,
    HeroModule,
    NamedSetsModule,
    NotesModule,
    PerkUsageModule,
    PerksModule,
    ShortUrlsModule,
    SkillsModule,
    MulterModule
  ]
})
export class AppModule {}
