import { stubClient } from '@clients/tests/clients.stub';

export const mockClientsRepository = {
  save: jest.fn().mockResolvedValue(stubClient()),
  findByEmail: jest.fn().mockResolvedValue(null),
};
