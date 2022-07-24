import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config, configValidationSchema } from './config';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './environments';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || enviroments.dev,
      validationSchema: configValidationSchema,
      load: [config],
      isGlobal: true,
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
