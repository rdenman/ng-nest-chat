import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestApplication, NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { AppModule } from './app/app.module';

const bootstrap: () => Promise<void> = async () => {
  const app: NestApplication = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();

  const port: number = app.get<ConfigService>('ConfigService').get<number>('PORT', 3000);
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port, 'Bootstrap');
  });
};

bootstrap();
