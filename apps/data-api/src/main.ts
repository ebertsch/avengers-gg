import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { environment } from '@avengers-game-guide/shared/environments'
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = environment.apiPrefix;
  app.setGlobalPrefix(globalPrefix);
  app.enableCors()
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port);
  });
}

bootstrap();
