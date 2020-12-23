import { Module } from '@nestjs/common';
import { GearModule } from '../gear/gear.module';
import { PerksModule } from '../perks/perks.module';
import { GearDetectorService } from './gear-detector.service';
import { MLController } from './ml.controller';
import { MLService } from './ml.service';

@Module({
  imports: [PerksModule, GearModule],
  controllers: [MLController],
  providers: [MLService, GearDetectorService],
  exports: [ GearDetectorService ]
})
export class MLModule {}