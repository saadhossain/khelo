import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { OrmModule } from '../orm/orm.module';
import { UtilsController } from './utils.controller';

@Module({
  imports: [OrmModule],
  providers: [UtilsService],
  controllers:[UtilsController],
  exports: [UtilsService],
})
export class UtilsModule {}
