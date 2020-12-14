import { Module } from '@nestjs/common';
import { GearDetectorService } from './gear-detector.service';
import { MLService } from './ml.service';

@Module({
  imports: [],
  controllers: [],
  providers: [MLService, GearDetectorService],
  exports: [ GearDetectorService ]
})
export class MLModule {}