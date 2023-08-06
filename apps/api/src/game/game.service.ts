import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DefaultGame } from 'src/model/responseType/defaultGame';
import { FirebaseCollection } from '../config/collection';
import { Game } from '../model/create-game.dto';
import { OrmService } from '../orm/orm.service';

@Injectable()
export class GameService {
  constructor(private ormService: OrmService) { }
  async getDefaultGames<T>(): Promise<T[]> {
    try {
      const defaultGamesArray =
        await this.ormService.findDocumentsByFieldName<DefaultGame>(
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
        gameData.push({ ...game, likes, plays, shares });
      }

      return gameData;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async getGameById<T>(id: string): Promise<T> {
    try {
      const game = await this.ormService.findDocumentById<Game>(
        FirebaseCollection.games,
        id,
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
      return { ...game, likes, shares, plays } as T;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getGameAssetsById<T>(id: string): Promise<T> {
    try {
      const gameAssets = await this.ormService.findDocumentById<any>(
        FirebaseCollection.gameAssets,
        id,
      );
      const filterdAssets = []
      for (const singleAssets in gameAssets) {
        if (gameAssets.hasOwnProperty(singleAssets)) {
          const assetsUrl = gameAssets[singleAssets];
          if (typeof assetsUrl === 'string' && assetsUrl.includes('.png' || '.jpg' || '.webp' || '.gif')) {
            filterdAssets.push(assetsUrl)
          }
        }
      }
      return filterdAssets as T;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async addImageToDocument<T>(docId: string, data:{}): Promise<T> {
    try {
      const assetRef = `${FirebaseCollection.gameAssets}`;
      const updatedData = await this.ormService.updateDocumentById<any>(assetRef, docId, data)
      return updatedData
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

}
