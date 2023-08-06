import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as admin from 'firebase-admin';
import { join } from 'path';
import { AppModule } from './app.module';
import { config } from './config/config';
import { ValidationPipe } from './pipes/validation.pipe';
import * as Sentry from "@sentry/node";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useStaticAssets(join(__dirname, '../', 'public'));
  app.useGlobalPipes(new ValidationPipe());
  const serviceAccount = config.firebase as admin.ServiceAccount;
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: config.storageBucket,
  });
  //Sentry configuration
  Sentry.init({
    dsn: "https://e213761e8062444a980f3aeb9dec2e13@o4504993034928128.ingest.sentry.io/4505046089072640",
    tracesSampleRate: 1.0,
  });
  await app.listen(config.port, async () => console.log(await app.getUrl()));
}
bootstrap();
