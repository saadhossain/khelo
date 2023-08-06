import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PlaygroundsModule } from './playground/playground.module';
import { OrmModule } from './orm/orm.module';
import { UtilsModule } from './utils/utils.module';
import { GameModule } from './game/game.module';
import { GenerateModule } from './generate/generate.module';
import { UserModule } from './user/user.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'web', 'dist'),
    }),
    BullModule.forRoot({
      redis: {
        password: '25022117',
        host: 'redis-12762.c301.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 12762,
      },
    }),
    ConfigModule.forRoot(),
    PlaygroundsModule,
    GameModule,
    OrmModule,
    UtilsModule,
    GenerateModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
