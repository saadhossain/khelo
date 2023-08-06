import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FirebaseCollection } from '../config/collection';
import { OrmService } from '../orm/orm.service';
import { Game, GameAction } from '../model/create-game.dto';
import { UserGame } from 'src/model/responseType/userGame';
import { User, RegisterUser } from '../model/user';

@Injectable()
export class UserService {
  constructor(private ormService: OrmService) {}
  async registerUser(user: User): Promise<User> {
    try {
      const existUser = await this.ormService.findExistDocumentById(
        FirebaseCollection.users,
        user.user_id,
      );
      if (existUser) {
        return user;
      } else {
        await this.ormService.insertDocumentByCustomId(
          FirebaseCollection.users,
          user.user_id,
          user,
        );
      }

      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateUser<T>(userId: string, userInfo: T): Promise<RegisterUser> {
    try {
      const userRef = `${FirebaseCollection.users}`;
      const updatedUser = await this.ormService.updateDocumentById<User>(
        userRef,
        userId,
        userInfo,
      );
      await this.ormService.insertDocument<UserActivities>(
        `${FirebaseCollection.users}/${userId}/${FirebaseCollection.activities}`,
        {
          action: 'update-profile',
          actionId: userId,
          changing_info: 'update-profile',
          game_id: null,
          game_name: null,
        },
      );
      delete updatedUser.firebase;
      return updatedUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getUserGames<T>(userId: string): Promise<T[]> {
    try {
      const userRef = this.ormService.createDocumentRef(
        `${FirebaseCollection.users}/${userId}`,
      );
      const userGames = await this.ormService.findDocumentsByFieldName<Game>(
        FirebaseCollection.games,
        'userRef',
        userRef,
      );
      const games = [];
      for (const game of userGames) {
        const likes = await this.ormService.countCollectionDocuments(
          `${FirebaseCollection.games}/${game.id}/${FirebaseCollection.like}`,
        );
        const plays = await this.ormService.countCollectionDocuments(
          `${FirebaseCollection.games}/${game.id}/${FirebaseCollection.play}`,
        );
        const shares = await this.ormService.countCollectionDocuments(
          `${FirebaseCollection.games}/${game.id}/${FirebaseCollection.share}`,
        );
        const likesRef = `${FirebaseCollection.games}/${game.id}/${FirebaseCollection.like}`;
        const isLiked = await this.ormService.isDocumentsExist(
          likesRef,
          'userRef',
          userRef,
        );
        delete game.userRef;
        games.push({
          ...game,
          likes,
          plays,
          shares,
          isLiked,
        });
      }
      return games;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async userDefaultGames<T>(userId: string): Promise<T[]> {
    try {
      const defaultGamesArray =
        await this.ormService.findDocumentsByFieldName<UserGame>(
          FirebaseCollection.games,
          'category',
          'default',
        );
      const gameData = [];
      for (const game of defaultGamesArray) {
        const likes = await this.ormService.countCollectionDocuments(
          `${FirebaseCollection.games}/${game.id}/${FirebaseCollection.like}`,
        );
        const plays = await this.ormService.countCollectionDocuments(
          `${FirebaseCollection.games}/${game.id}/${FirebaseCollection.play}`,
        );
        const shares = await this.ormService.countCollectionDocuments(
          `${FirebaseCollection.games}/${game.id}/${FirebaseCollection.share}`,
        );
        //Get User Likes or not
        const likesRef = `${FirebaseCollection.games}/${game.id}/${FirebaseCollection.like}`;
        const userRef = this.ormService.createDocumentRef(
          `${FirebaseCollection.users}/${userId}`,
        );
        const isLiked = await this.ormService.isDocumentsExist(
          likesRef,
          'userRef',
          userRef,
        );
        delete game.userRef;
        gameData.push({
          ...game,
          likes,
          plays,
          shares,
          isLiked,
        });
      }

      return gameData;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async unlikeGame(userId: string, gameId: string): Promise<string> {
    try {
      const userRef = this.ormService.createDocumentRef(
        `${FirebaseCollection.users}/${userId}`,
      );
      const likesRef = `${FirebaseCollection.games}/${gameId}/${FirebaseCollection.like}`;
      const data = await this.ormService.deleteDocumentsByFieldName(
        likesRef,
        'userRef',
        userRef,
      );

      console.log('disliked');
      return 'Disliked success';
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  verifyGameActionQuery(query: string): string {
    const subCollections = new FirebaseCollection().getGamesCollections();
    if (subCollections.includes(query)) return query;
    throw new BadRequestException(`Your ${query} is not a valid game action`);
  }

  async insertDocumentByAction(
    user_id: string,
    game_id: string,
    action: string,
    doc?: any,
  ): Promise<string> {
    try {
      const pointer = `${FirebaseCollection.games}/${game_id}/${action}`;
      const gameRef = this.ormService.createDocumentRef(
        `${FirebaseCollection.games}/${game_id}`,
      );
      const userRef = this.ormService.createDocumentRef(
        `${FirebaseCollection.users}/${user_id}`,
      );
      const data = new GameAction(userRef, gameRef);
      await this.ormService.insertDocument<GameAction>(pointer, data);

      await this.ormService.insertDocument<UserActivities>(
        `${FirebaseCollection.users}/${user_id}/${FirebaseCollection.activities}`,
        {
          action,
          game_id: game_id,
          game_name: doc.game_name,
          actionId: null,
          changing_info: null,
        },
      );
      return `${action} success`;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getGameById<T>(gameId: string, userId: string): Promise<T> {
    try {
      const game = await this.ormService.findDocumentById<Game>(
        FirebaseCollection.games,
        gameId,
      );

      const likes = await this.ormService.countCollectionDocuments(
        `${FirebaseCollection.games}/${game.id}/${FirebaseCollection.like}`,
      );
      const plays = await this.ormService.countCollectionDocuments(
        `${FirebaseCollection.games}/${game.id}/${FirebaseCollection.play}`,
      );
      const shares = await this.ormService.countCollectionDocuments(
        `${FirebaseCollection.games}/${game.id}/${FirebaseCollection.share}`,
      );
      const likesRef = `${FirebaseCollection.games}/${game.id}/${FirebaseCollection.like}`;
      const userRef = this.ormService.createDocumentRef(
        `${FirebaseCollection.users}/${userId}`,
      );
      const isLiked = await this.ormService.isDocumentsExist(
        likesRef,
        'userRef',
        userRef,
      );
      delete game.userRef;
      return { ...game, likes, shares, plays, isLiked } as T;
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getUserActivity(userId: string) {
    const data = await this.ormService.getDocuments(
      `${FirebaseCollection.users}/${userId}/${FirebaseCollection.activities}`,
    );
    return data;
  }

  async getUserActivityByAction(userId: string): Promise<UserActivities[]> {
    try {
      const pointer = `${FirebaseCollection.users}/${userId}/${FirebaseCollection.activities}`;
      const actions = [
        'likes',
        'shares',
        'plays',
        'generate',
        'clone',
        'update-profile',
      ];

      let data = [];

      const queryPromise = actions.map((query) => {
        return this.ormService.getDocumentsByFieldNameWithDesc<UserActivities>(
          pointer,
          'action',
          query,
        );
      });

      const results = await Promise.all(queryPromise);
      results.map((result, i) => {
        result.map((item) => {
          data.push(item);
        });
      });

      const sortedData = data.sort((a, b) => {
        const dateA = a.createdAt.getTime();
        const dateB = b.createdAt.getTime();
        return dateB - dateA;
      });

      return sortedData;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
