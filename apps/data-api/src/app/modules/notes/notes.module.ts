import { CacheModule, Module } from '@nestjs/common';

import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

@Module({
  imports: [
    CacheModule.register(),
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
