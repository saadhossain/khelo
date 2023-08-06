import {
  Controller,
  Post,
  Req,
  Param,
  Sse,
  UseGuards,
  Body,
} from '@nestjs/common';
import { GenerateService } from './generate.service';
import { FirebaseAuthGuard } from '../guard/firebase-auth.guard';
import { ResponseType } from '../model/responseType';
import { interval, concatMap, Observable } from 'rxjs';
import { CloneGameDto } from '../model/createType/cloneGame.dto';
import { GenerateGameDto } from 'src/model/createType/generateGame.dto';
import { UserGame } from '../model/responseType/userGame';
import { User } from '../model/user';

@Controller('generate')
export class GenerateController {
  constructor(private generateService: GenerateService) {}

  @UseGuards(FirebaseAuthGuard)
  @Post('process')
  async generateNewGame(
    @Body()
    { title, imageURL }: GenerateGameDto,
    @Req() req: Request & { user: User },
  ): Promise<ResponseType<{ id: number }>> {
    const user_id = req.user.user_id;
    const data = await this.generateService.addGameToQueueForProcess(
      'process',
      {
        game_title: title,
        user_id,
        game_img_url: imageURL,
      },
    );

    return { status: 'success', data: data };
  }

  @UseGuards(FirebaseAuthGuard)
  @Post('clone')
  async cloneNewGame(
    @Req() req: Request & { user: User },
    @Body() cloneGameDto: CloneGameDto,
  ): Promise<ResponseType<{ id: number }>> {
    const user_id = req.user.user_id;
    const { template_name, game } = cloneGameDto;
    const { game_name, img } = game;

    const data = await this.generateService.addGameToQueueForProcess('clone', {
      game_title: template_name,
      user_id,
      img,
      game_name,
    });

    return { status: 'success', data };
  }

  @Sse('status/process/:id')
  async getGameProcessStatus(
    @Param('id') id: string,
  ): Promise<Observable<{ data: { status: UserGame } }>> {
    const status = interval(2000).pipe(
      concatMap(async (_) => {
        const data = await this.generateService.getGameProcessStatusFromQueue(
          id,
        );
        return { data: { status: data } };
      }),
    );
    return status;
  }
  @Sse('status/clone/:id')
  async getGameCloneStatus(
    @Param('id') id: string,
  ): Promise<Observable<{ data: { status: UserGame } }>> {
    const status = interval(2000).pipe(
      concatMap(async (_) => {
        const data = await this.generateService.getGameCloneStatusFromQueue(id);
        return { data: { status: data } };
      }),
    );
    return status;
  }
}
