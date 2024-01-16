import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { EnvironmentVariables } from 'config/env.validation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService =
    app.get<ConfigService<EnvironmentVariables>>(ConfigService);
  const port = configService.get('PORT', { infer: true });
  await app.listen(port);
  console.log('enviroment', configService.get('NODE_ENV'));
  console.log(`Listen on port ${port}`);
}
bootstrap();
