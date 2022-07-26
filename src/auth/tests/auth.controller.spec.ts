import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';

import { AuthController } from '@auth/auth.controller';
import { ClientsService } from '@clients/clients.service';
import { mockClientsService } from '@clients/tests/clients.service.mock';
import { stubClient, stubRegisterClientDTO } from '@clients/tests/clients.stub';
import { Client } from '@clients/entities/client.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let clientsService: ClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: ClientsService, useValue: mockClientsService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    clientsService = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(clientsService).toBeDefined();
  });

  describe('register', () => {
    it('should register the client successfully', async () => {
      const client = stubClient();
      const dto = stubRegisterClientDTO(client);

      jest.spyOn(clientsService, 'register').mockResolvedValueOnce(client);

      const response = await controller.register(dto);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Client);
      expect(response.address).toBe(dto.address);
      expect(response.email).toBe(dto.email);
      expect(response.name).toBe(dto.name);
      expect(response.documentID).toBe(dto.document_id);

      expect(clientsService.register).toBeCalledWith(dto);
    });

    it('should fail because client service throw an exception', async () => {
      const dto = stubRegisterClientDTO();

      jest.spyOn(clientsService, 'register').mockImplementationOnce(() => {
        throw new InternalServerErrorException();
      });

      await expect(controller.register(dto)).rejects.toThrowError(InternalServerErrorException);

      expect(clientsService.register).toBeCalledWith(dto);
    });
  });
});
