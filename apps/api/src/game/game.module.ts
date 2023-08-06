import { Module } from '@nestjs/common';
import { OrmModule } from '../orm/orm.module';
import { GameController } from './game.contorller';
import { GameService } from './game.service';

@Module({
  imports: [OrmModule],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
