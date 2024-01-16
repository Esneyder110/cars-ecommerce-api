import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { EnvironmentVariables } from 'config/';
import { HttpExceptionFilter } from './errors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  const configService =
    app.get<ConfigService<EnvironmentVariables>>(ConfigService);
  const port = configService.get('PORT', { infer: true });
  await app.listen(port);
  console.log('enviroment', configService.get('NODE_ENV'));
  console.log(`Listen on port ${port}`);
}
bootstrap();
