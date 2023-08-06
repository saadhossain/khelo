import { HttpService } from '@nestjs/axios';
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { GenerateGame } from '../model/generate.dto';
import { FirebaseCollection } from 'src/config/collection';
import { GameCategory } from '../model/enums/gameCategory.enum';
import { Game } from '../model/create-game.dto';
import { OrmService } from '../orm/orm.service';
import { getStorage } from 'firebase-admin/storage';
import { UserGame } from 'src/model/responseType/userGame';
import { v4 as uuidv4 } from 'uuid';

@Processor('gameGenerate')
export class GenerateGameConsumer {
  constructor(
    private httpService: HttpService,
    private ormService: OrmService,
  ) {}
  @Process()
  async transcode(
    job: Job<GenerateGame>,
  ): Promise<{ status: 'completed'; data: UserGame }> {
    try {
      const { game_title, user_id, game_img_url } = job.data;
      console.log(game_img_url);

      await job.progress('Processing image');

      //Static Game
      // const { game_assets, game_name } = {
      //   game_name: 'astray',
      //   game_assets: [
      //     {
      //       image_name: 'ball.png',
      //       image_file:
      //         'https://firebasestorage.googleapis.com/v0/b/laail-bot.appspot.com/o/ball.png?alt=media&token=b40b4434-fde5-441d-9cce-73f1d8c154d3',
      //     },
      //     {
      //       image_name: 'concrete.png',
      //       image_file:
      //         'https://firebasestorage.googleapis.com/v0/b/laail-bot.appspot.com/o/concrete.png?alt=media&token=412e20a1-1e5f-437f-934e-945c6d030da8',
      //     },
      //     {
      //       image_name: 'brick.png',
      //       image_file:
      //         'https://firebasestorage.googleapis.com/v0/b/laail-bot.appspot.com/o/brick.png?alt=media&token=66aac8c8-031a-4368-8cdd-8493e3e91769',
      //     },
      //   ],
      // };

      //Customized Game
      // const { game_assets, game_name } =await this.ormService.getGameAssetsFromApi(game_img_url);
      
      
      const uniqueId = uuidv4();
      const game_id = uniqueId.replace(/-/g, '').slice(0,20);
      const item = {
        image_url: game_img_url,
      };
      const res = await this.ormService.generate_image(item.image_url, game_title, game_id);
      console.log(` out side the result ${res}`);
      const game_assets = res.game_assets;
      const game_name = res.game_name;

      await job.progress('Forking Game');
      const {gameUrl } = await this.ormService.forkGameFromFirestore(
        game_name,
        game_id
      );

      await job.progress('Downloading source');
      for (const assets of game_assets) {
        const { data } = await this.httpService
          .get(assets.image_file, { responseType: 'arraybuffer' })
          .toPromise();
        const bucket = getStorage().bucket();
        const filePath = bucket.file(`${game_id}/${assets.image_name}`);
        await filePath.save(data, { resumable: false, public: true });
      }
      console.log('replaced image ');
      await job.progress('Storing Game source');

      const userRef = this.ormService.createDocumentRef(
        `${FirebaseCollection.users}/${user_id}`,
      );
      const game = new Game(
        game_title,
        'https://firebasestorage.googleapis.com/v0/b/khelo-42049.appspot.com/o/game-imgs%2Fastray.png?alt=media&token=28bb4921-05e0-49e0-9a2b-0d23e9951d7d',
        gameUrl,
        GameCategory.Generate,
        userRef,
        game_id,
      );

      const newGame = await this.ormService.insertDocument<Game>(
        FirebaseCollection.games,
        game,
      );
      await this.ormService.insertDocument<UserActivities>(
        `${FirebaseCollection.users}/${user_id}/${FirebaseCollection.activities}`,
        {
          action: 'generate',
          game_id: newGame.id,
          game_name: game_title,
          actionId: null,
          changing_info: null,
        },
      );
      delete newGame.userRef;

      console.log('clone completed');
      await job.progress('completed');
      const gameData = {
        ...newGame,
        likes: 0,
        plays: 0,
        shares: 0,
        isLiked: false,
      };
      return { status: 'completed', data: gameData };
    } catch (error) {
      console.log(error.message);
    }
  }
}
