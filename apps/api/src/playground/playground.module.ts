import { Module } from '@nestjs/common';
import { PlaygroundController } from './playground.controller';
import { PlaygroundService } from './playground.service';

@Module({
  controllers: [PlaygroundController],
  providers: [PlaygroundService],
})
export class PlaygroundsModule {}
