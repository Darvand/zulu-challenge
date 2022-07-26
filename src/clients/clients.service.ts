import { Injectable, Logger } from '@nestjs/common';

import { Client, ClientDocument } from '@clients/entities/client.entity';
import { RegisterClientDTO } from '@clients/dtos/register-client.dto';
import { ClientsRepository } from '@clients/clients.repository';
import { ClientAlreadyExistException } from '@clients/exceptions/already-registered.exception';
import { SharedUtils } from '@shared/shared.utils';

@Injectable()
export class ClientsService {
  private readonly logger = new Logger(ClientsService.name);

  constructor(private readonly repository: ClientsRepository) {}

  async register(client: RegisterClientDTO): Promise<Client> {
    const emailAlreadyRegistered = await this.repository.findByEmail(client.email);
    if (emailAlreadyRegistered) {
      throw new ClientAlreadyExistException();
    }
    this.logger.log(`User with email [${client.email}] not registered`);
    const hashedPassword = await SharedUtils.hashValue(client.password);
    const hashedUser = new Client({ ...client, documentID: client.document_id, password: hashedPassword });
    this.logger.log(`Attempting to register requested user`);
    const savedClient = await this.repository.save(hashedUser);
    this.logger.log(`Client successfully registered`);
    return new Client(savedClient);
  }

  async findByEmail(email: string): Promise<ClientDocument> {
    return this.repository.findByEmail(email);
  }

  async findById(id: string): Promise<Client> {
    return this.repository.findById(id);
  }
}
