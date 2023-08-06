import { Module } from '@nestjs/common';
import { OrmService } from './orm.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [OrmService],
  exports: [OrmService],
})
export class OrmModule {}
