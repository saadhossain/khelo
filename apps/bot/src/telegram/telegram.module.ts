import { Module } from '@nestjs/common';
import { TelegramService } from './teleram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { HttpModule } from '@nestjs/axios';
import { session } from 'telegraf';
import { sessionDefaultValue } from './state';

@Module({
  imports: [
    HttpModule,
    TelegrafModule.forRoot({
      // TELEGRAM_BOT_TOKEN=5735350167:AAEldmP58LNstkGENCJpcHQ-07R0NhhwACk
      token: '5735350167:AAEldmP58LNstkGENCJpcHQ-07R0NhhwACk',
      middlewares: [session({ defaultSession: () => sessionDefaultValue })],
    }),
  ],
  controllers: [],
  providers: [TelegramService],
})
export class TelegramModule {}
