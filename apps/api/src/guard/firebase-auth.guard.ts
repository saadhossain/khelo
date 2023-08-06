import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as firebase from 'firebase-admin';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();

      const telebot_id = request.body.user_id;
      console.log(telebot_id);
      if (telebot_id) {
        request.user = { user_id: telebot_id };
        return true;
      }
      const authorization = request.headers.authorization || '';

      if (!authorization) {
        console.log('Invalid authorization header');
        throw new UnauthorizedException('Invalid authorization header');
      }
      const token = authorization.split(' ')[1];
      const auth = firebase.auth();
      const validUser = await auth.verifyIdToken(token, true);
      if (!validUser) throw new UnauthorizedException();
      request.user = validUser;
      return true;
    } catch (error) {
      if (error.code === 'auth/id-token-expired') {
        throw new UnauthorizedException('token has expired');
      }
      throw new BadRequestException(error.message);
    }
  }
}
