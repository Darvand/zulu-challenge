import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { config } from 'src/config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, username, password, host, port, db } = configService.database;
        return {
          uri: `${connection}://${host}:${port}`,
          user: username,
          pass: password,
          dbName: db,
        };
      },
      inject: [config.KEY],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
