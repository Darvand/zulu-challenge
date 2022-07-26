import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config, configValidationSchema } from './config';
import { enviroments } from './environments';
import { DatabaseModule } from '@database/database.module';
import { ClientsModule } from '@clients/clients.module';
import { AuthModule } from '@auth/auth.module';
import { WalletsModule } from '@wallets/wallets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || enviroments.dev,
      validationSchema: configValidationSchema,
      load: [config],
      isGlobal: true,
    }),
    DatabaseModule,
    ClientsModule,
    AuthModule,
    WalletsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
