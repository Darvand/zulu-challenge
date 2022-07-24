import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Logger.log(`Server started on port: ${3000}`);
  await app.listen(3000);
}
bootstrap();
