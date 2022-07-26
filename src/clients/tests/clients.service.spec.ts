import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';

import { ClientsService } from '@clients/clients.service';
import { ClientsRepository } from '@clients/clients.repository';
import { mockClientsRepository } from '@clients/tests/clients.repository.mock';
import { stubClient, stubRegisterClientDTO } from '@clients/tests/clients.stub';
import { Client } from '@clients/entities/client.entity';
import { ClientAlreadyExistException } from '@clients/exceptions/already-registered.exception';

describe('ClientsService', () => {
  let service: ClientsService;
  let repository: ClientsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: ClientsRepository,
          useValue: mockClientsRepository,
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    repository = module.get<ClientsRepository>(ClientsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('register', () => {
    it('should register a user successfully', async () => {
      const client = stubClient();
      const dto = stubRegisterClientDTO(client);

      jest.spyOn(repository, 'save').mockResolvedValueOnce(client);

      const response = await service.register(dto);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Client);
      expect(response.address).toBe(dto.address);
      expect(response.email).toBe(dto.email);
      expect(response.name).toBe(dto.name);
      expect(response.documentID).toBe(dto.document_id);

      expect(repository.findByEmail).toBeCalledWith(dto.email);
      expect(repository.save).not.toBeCalledWith(dto);
    });

    it('should fail because email is already registered', async () => {
      const client = stubClient();
      const dto = stubRegisterClientDTO(client);

      jest.spyOn(repository, 'findByEmail').mockResolvedValueOnce(client);

      await expect(service.register(dto)).rejects.toThrowError(ClientAlreadyExistException);

      expect(repository.findByEmail).toBeCalledWith(dto.email);
    });

    it('should fail because save client fail', async () => {
      const client = stubClient();
      const dto = stubRegisterClientDTO(client);

      jest.spyOn(repository, 'save').mockImplementationOnce(() => {
        throw new InternalServerErrorException();
      });

      await expect(service.register(dto)).rejects.toThrowError(InternalServerErrorException);

      expect(repository.findByEmail).toBeCalledWith(dto.email);
      expect(repository.save).not.toBeCalledWith(dto);
    });
  });
});
