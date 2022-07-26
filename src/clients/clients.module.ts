import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Client, ClientSchema } from '@clients/entities/client.entity';
import { ClientsService } from '@clients/clients.service';
import { ClientsRepository } from '@clients/clients.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Client.name,
        schema: ClientSchema,
      },
    ]),
  ],
  providers: [ClientsService, ClientsRepository],
  exports: [ClientsService],
})
export class ClientsModule {}
