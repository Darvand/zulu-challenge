import { stubClient } from '@clients/tests/clients.stub';

export const mockClientsService = {
  register: jest.fn().mockResolvedValue(stubClient()),
};
