import { Injectable } from '@nestjs/common';
import {
  Update,
  Ctx,
  Start,
  Hears,
  Action,
  Message,
  On,
  Next,
} from 'nestjs-telegraf';
import { state, button } from './state';
import { HttpService } from '@nestjs/axios';
import { SessionContext, session } from 'telegraf/typings/session';
import { Session, UserGame } from './interface';
import { SessionStageValue } from './class';
var EventSource = require('eventsource');
@Update()
@Injectable()
export class TelegramService {
  constructor(private readonly axios: HttpService) {}

  @Start()
  async start(@Ctx() ctx: SessionContext<Session>) {
    try {
      const { text, markup } = state.start;
      await ctx.sendMessage(text(ctx.from.first_name), {
        parse_mode: 'HTML',
        ...markup,
      });
      const user = ctx.message.from;
      await this.axios
        .post(`${process.env.API_URL}/user/bot-register`, user)
        .toPromise();
      ctx.session.Back = 'start';
    } catch (error) {
      console.log(error);
    }
  }

  @Hears(button.keyboard_btn.start.Games)
  async games(@Ctx() ctx: SessionContext<Session>) {
    try {
      const { text, markup } = state.games;
      const { data } = await this.axios
        .get(`${process.env.API_URL}/game`)
        .toPromise();
      ctx.session.store.games = data.data;
      await ctx.sendMessage(text, { ...markup });
    } catch (error) {
      console.log(error);
    }
  }
  @Hears([...Object.values(button.keyboard_btn.games)])
  async astray(@Ctx() ctx: SessionContext<Session>) {
    try {
      const games = ctx.session.store.games;
      const command = ctx.message['text'] as string;
      const game = games.find(
        (item) => item.game_name === command.toLowerCase(),
      );
      await ctx.sendPhoto(game.img, {
        caption: `<b>${command}</b>`,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '👍', callback_data: 'like' },
              { text: '⏩', callback_data: 'like' },
              { text: '💬', callback_data: 'comment' },
            ],
            [
              { text: 'Clone', callback_data: 'clone' },
              {
                text: 'Play',
                web_app: {
                  url: game.gameUrl,
                },
              },
            ],
          ],
        },
      });
      ctx.session.next = 'clone';
      ctx.session.store.clone = {
        game_id: game.id,
        game_name: game.game_name,
        title: '',
        img: game.img,
      };
    } catch (error) {
      console.log(error);
    }
  }

  @Hears(button.keyboard_btn.start.Upload_photo)
  async AskForGameTitle(@Ctx() ctx: SessionContext<Session>) {
    try {
      const { text } = state.ask_for_game_title;
      await ctx.sendMessage(text);
      ctx.session.next = SessionStageValue.take_upload_photo_title;
    } catch (error) {
      console.log(error);
    }
  }

  @On('message')
  async onMassage(
    @Ctx() ctx: SessionContext<Session>,
    @Next() next: () => void,
  ) {
    const user_input = ctx.message['text'];
    const user = ctx.message.from;
    const user_id = user.id.toString();
    const stage = ctx.session.next;
    const sessionCloneData = ctx.session.store.clone;
    if (stage === SessionStageValue.take_upload_photo_title) {
      await ctx.sendMessage('Please upload image for generate game');
      ctx.session.store.generate.title = user_input;
      ctx.session.next = SessionStageValue.take_upload_photo;
    } else if (stage === 'clone-game-name') {
      const { data } = await this.axios
        .post(`${process.env.API_URL}/generate/clone`, {
          game: {
            game_name: sessionCloneData.game_name,
            img: sessionCloneData.img,
          },
          template_name: user_input,
          user_id,
        })
        .toPromise();

      const sse = new EventSource(
        `${process.env.API_URL}/generate/status/clone/${data.data.id}`,
      );
      function getRealtimeData(data: any) {
        console.log(data.status);
        if (data.status?.status === 'completed') {
          const game = data.status.data as UserGame;
          ctx.sendPhoto(game.img, {
            caption: `<b>${game.game_name}</b>`,
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: [
                [
                  { text: '👍', callback_data: 'like' },
                  { text: '⏩', callback_data: 'like' },
                  { text: '💬', callback_data: 'comment' },
                ],
                [
                  {
                    text: 'Play',
                    web_app: {
                      url: game.gameUrl,
                    },
                  },
                ],
              ],
            },
          });
          sse.close();
          ctx.session.next = '';
        }
      }
      sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));
      sse.onerror = () => {
        sse.close();
        ctx.session.next = '';
      };
    }
    next();
  }
  @On('photo')
  async onPhoto(@Ctx() ctx: SessionContext<Session>, @Next() next: () => void) {
    const photoSizes = ctx.message['photo'];
    const stage = ctx.session.next;
    const file_id = photoSizes[photoSizes.length - 1].file_id;
    const user = ctx.message.from;
    const user_id = user.id.toString();

    if (stage === SessionStageValue.take_upload_photo) {
      await ctx.sendMessage('Please wait a some time');
      const photo_link = await ctx.telegram.getFileLink(file_id);
      const imgUrl = photo_link.href;
      const generateDate = ctx.session.store.generate;

      const { data } = await this.axios
        .post(`${process.env.API_URL}/generate/process`, {
          title: generateDate.title,
          imageURL: imgUrl,
          user_id,
        })
        .toPromise();

      console.log(data);

      const sse = new EventSource(
        `${process.env.API_URL}/generate/status/process/${data.data.id}`,
      );

      function getRealtimeData(data: any) {
        console.log(data.status);
        if (data.status?.status === 'completed') {
          const game = data.status.data as UserGame;
          ctx.sendPhoto(game.img, {
            caption: `<b>${game.game_name}</b>`,
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: [
                [
                  { text: '👍', callback_data: 'like' },
                  { text: '⏩', callback_data: 'like' },
                  { text: '💬', callback_data: 'comment' },
                ],

                [
                  {
                    text: 'Play',
                    web_app: {
                      url: game.gameUrl,
                    },
                  },
                ],
              ],
            },
          });
          sse.close();
        }
      }
      sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));
      sse.onerror = () => {
        sse.close();
      };
    }
    next();
  }

  @Action('clone')
  async cloneGame(
    @Ctx() ctx: SessionContext<Session>,
    @Next() next: () => void,
  ) {
    await ctx.sendMessage('Please Enter your game name');
    ctx.session.next = 'clone-game-name';
    next();
  }

  // Handle Back button
  @Hears(button.keyboard_btn.common.Back)
  async back(@Ctx() ctx: SessionContext<Session>) {
    if (ctx.session.Back === 'start') {
      this.start(ctx);
    }
  }
}
