import {
  Controller,
  Get,
  UseGuards,
  Req,
  Query,
  Delete,
  Param,
  Post,
  Patch,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FirebaseAuthGuard } from '../guard/firebase-auth.guard';
import { SentryInterceptor } from '../interceptor/sentry.interceptor';
import { ResponseType } from '../model/responseType';
import { UserGame } from '../model/responseType/userGame';
import { UpdateProfileDto } from 'src/model/createType/updateProfile.dto';
import { RegisterUser, User } from '../model/user';

@UseInterceptors(SentryInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(FirebaseAuthGuard)
  @Get('register')
  async registerUserByFirebase(
    @Req() req: Request & { user: User },
  ): Promise<ResponseType<RegisterUser>> {
    const { name, picture, user_id, email, email_verified, firebase } =
      req.user;
    await this.userService.registerUser({
      name,
      picture,
      user_id,
      email,
      email_verified,
      firebase,
    });
    return {
      status: 'success',
      data: { name, picture, user_id, email, email_verified },
    };
  }
  @Post('bot-register')
  async userRegisterByTelBot(@Body() body: any) {
    const { id, first_name, last_name } = body;
    await this.userService.registerUser({
      user_id: id.toString(),
      name: `${first_name} ${last_name}`,
      email: '',
    });

    return 'success';
  }

  @UseGuards(FirebaseAuthGuard)
  @Get('default-games')
  async userDefaultGame(
    @Req() req: Request & { user: User },
  ): Promise<ResponseType<UserGame[]>> {
    const user_id = req.user.user_id;
    const data = await this.userService.userDefaultGames<UserGame>(user_id);
    return { status: 'success', data };
  }

  @UseGuards(FirebaseAuthGuard)
  @Get('games')
  async getUserGames(
    @Req() req: Request & { user: User },
  ): Promise<ResponseType<UserGame[]>> {
    const user_id = req.user.user_id;
    const data = await this.userService.getUserGames<UserGame>(user_id);
    return { status: 'success', data };
  }
  @UseGuards(FirebaseAuthGuard)
  @Get('game/:id')
  async getGameById(
    @Req() req: Request & { user: User },
    @Param('id') id: string,
  ): Promise<ResponseType<UserGame>> {
    const user_id = req.user.user_id;
    const data = await this.userService.getGameById<UserGame>(id, user_id);
    return { status: 'success', data };
  }

  @UseGuards(FirebaseAuthGuard)
  @Post('game/:id')
  async queryUserGameAction(
    @Param('id') gameId: string,
    @Query() query: { action: string },
    @Req() req: Request & { user: User },
  ): Promise<ResponseType<string>> {
    const userId = req.user.user_id;
    const gameInfo = req.body;
    const action = this.userService.verifyGameActionQuery(query.action);
    const data = await this.userService.insertDocumentByAction(
      userId,
      gameId,
      action,
      gameInfo,
    );
    return { status: 'success ', data };
  }

  @UseGuards(FirebaseAuthGuard)
  @Delete('game/dislike/:id')
  async unlikeGame(
    @Req() req: Request & { user: User },
    @Param('id') gameId: string,
  ): Promise<ResponseType<string>> {
    const userId = req.user.user_id;
    const data = await this.userService.unlikeGame(userId, gameId);
    return { status: 'Success', data };
  }
  @UseGuards(FirebaseAuthGuard)
  @Get('activity')
  async getUserGameActivity(
    @Query('filter') action: string,
    @Req() req: Request & { user: User },
  ): Promise<ResponseType<UserActivities[]>> {
    const userId = req.user.user_id;
    const data = await this.userService.getUserActivityByAction(userId);

    return { status: 'success', data };
  }

  @UseGuards(FirebaseAuthGuard)
  @Patch('update/:id')
  async updateUserInfo(
    @Param('id') userId: string,
    @Body() userInfo: UpdateProfileDto,
  ): Promise<ResponseType<RegisterUser>> {
    const data = await this.userService.updateUser<UpdateProfileDto>(
      userId,
      userInfo,
    );
    return { status: 'Success', data };
  }
}
