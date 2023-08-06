import { Body, Controller, Get, Param, Patch, UseInterceptors } from '@nestjs/common';
import { ResponseType } from '../model/responseType';
import { GameService } from './game.service';
import { SentryInterceptor } from 'src/interceptor/sentry.interceptor';
import { DefaultGame } from 'src/model/responseType/defaultGame';
import { GameAssets } from 'src/model/generate.dto';
@UseInterceptors(SentryInterceptor)
@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get()
  async getDefaultGameList(): Promise<ResponseType<DefaultGame[]>> {
    const data = await this.gameService.getDefaultGames<DefaultGame>();
    return { status: 'success', data };
  }

  @Get(':id')
  async getGameById(
    @Param('id') id: string,
  ): Promise<ResponseType<DefaultGame>> {
    const data = await this.gameService.getGameById<DefaultGame>(id);
    return { status: 'success', data };
  }

  @Get('assets/:id')
  async getGameAssetsById(
    @Param('id') id: string,
  ): Promise<ResponseType<GameAssets>> {
    const data = await this.gameService.getGameAssetsById<GameAssets>(id);
    return { status: 'success', data };
  }
  @Patch('savedesign/:id')
  async saveEditedImage (
    @Param('id') assetId: string,
    @Body() imageInfo: string
    ):Promise<ResponseType<any>>{
      const data = await this.gameService.addImageToDocument<any>(
        assetId,
        imageInfo,
      );
      return { status: 'Success', data };
  }
}
