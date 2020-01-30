import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

const bootstrap: () => Promise<void> = async () => {
  const app: NestApplication = await NestFactory.create(AppModule);
  app.enableCors();
  const port: number = Number(app.get<ConfigService>('ConfigService').get<number>('PORT', 3000));
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port, 'Bootstrap');
  });
};

bootstrap();
