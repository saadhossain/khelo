import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { FirebaseCollection } from 'src/config/collection';
import { UserGame } from 'src/model/responseType/userGame';
import { v4 as uuidv4 } from 'uuid';
import { Game } from '../model/create-game.dto';
import { GameCategory } from '../model/enums/gameCategory.enum';
import { GenerateGame } from '../model/generate.dto';
import { OrmService } from '../orm/orm.service';

@Processor('cloneGame')
export class GameCloneConsumer {
  constructor(private ormService: OrmService) { }
  @Process()
  async transcode(
    job: Job<GenerateGame>,
  ): Promise<{ status: 'completed'; data: UserGame }> {
    const uniqueId = uuidv4();
    const game_id = uniqueId.replace(/-/g, '').slice(0, 20);
    try {
      const { game_title, user_id, game_name, img } = job.data;
      await job.progress('Forking Game');
      const { gameUrl } = await this.ormService.forkGameFromFirestore(
        game_name,
        game_id
      );

      const userRef = this.ormService.createDocumentRef(
        `${FirebaseCollection.users}/${user_id}`,
      );
      const game = new Game(
        game_title,
        img,
        gameUrl,
        GameCategory.Clone,
        userRef,
        game_id
      );
      const newGame = await this.ormService.insertDocument<Game>(
        FirebaseCollection.games,
        game,
      );
      await this.ormService.insertDocument<UserActivities>(
        `${FirebaseCollection.users}/${user_id}/${FirebaseCollection.activities}`,
        {
          action: 'clone',
          game_id: newGame.id,
          game_name: newGame.game_name,
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
