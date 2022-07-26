import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { ClientsRepository } from '@clients/clients.repository';
import { FakeClientModel, fakeModelExec, fakeModelSave } from '@clients/tests/clients.model.fake';
import { stubClient } from '@clients/tests/clients.stub';
import { Client } from '@clients/entities/client.entity';

describe('ClientsService', () => {
  let repository: ClientsRepository;
  let model: FakeClientModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsRepository,
        {
          provide: getModelToken(Client.name),
          useValue: FakeClientModel,
        },
      ],
    }).compile();

    repository = module.get<ClientsRepository>(ClientsRepository);
    model = module.get<FakeClientModel>(getModelToken(Client.name));
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(model).toBeDefined();
  });

  describe('findByEmail', () => {
    it('should return successfully', async () => {
      const client = stubClient();
      const response = await repository.findByEmail(client.email);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Client);
      expect(response.address).toBeDefined();
      expect(response.email).toBeDefined();
      expect(response.name).toBeDefined();
      expect(response.documentID).toBeDefined();

      expect(FakeClientModel.findOne).toBeCalledWith({ email: client.email });
      expect(fakeModelExec.exec).toBeCalled();
    });
  });

  describe('save', () => {
    it('should save successfully', async () => {
      const client = stubClient();
      const response = await repository.save(client);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Client);
      expect(response.address).toBe(client.address);
      expect(response.email).toBe(client.email);
      expect(response.name).toBe(client.name);
      expect(response.documentID).toBe(client.documentID);
      expect(response.password).toBe(client.password);

      expect(fakeModelSave).toBeCalled();
    });
  });
});
