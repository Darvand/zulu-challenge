import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Client, ClientDocument } from '@clients/entities/client.entity';

@Injectable()
export class ClientsRepository {
  private readonly logger = new Logger(ClientsRepository.name);

  constructor(@InjectModel(Client.name) private clientModel: Model<Client>) {}

  save(client: Client): Promise<Client> {
    const newClient = new this.clientModel(client);
    return newClient.save();
  }

  findByEmail(email: string): Promise<ClientDocument> {
    this.logger.log(`Attempting to find a user with email [${email}]`);
    return this.clientModel.findOne({ email }).exec();
  }

  findById(id: string): Promise<Client> {
    this.logger.log(`Attempting to find client with id [${id}]`);
    return this.clientModel.findById(id).exec();
  }
}
