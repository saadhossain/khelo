import { Module } from '@nestjs/common';
import { GenerateService } from './generate.service';
import { GenerateController } from './generate.controller';
import { HttpModule } from '@nestjs/axios';
import { OrmModule } from '../orm/orm.module';
import { GenerateGameConsumer } from './process.consumer';
import { BullModule } from '@nestjs/bull';
import { GameCloneConsumer } from './clone.consumer';

@Module({
  imports: [
    HttpModule,
    OrmModule,
    BullModule.registerQueue({
      name: 'gameGenerate',
    }),
    BullModule.registerQueue({
      name: 'cloneGame',
    }),
  ],
  controllers: [GenerateController],
  providers: [GenerateService, GenerateGameConsumer, GameCloneConsumer],
})
export class GenerateModule {}
