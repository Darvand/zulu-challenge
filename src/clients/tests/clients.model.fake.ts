import { Client } from '@clients/entities/client.entity';
import { stubClient } from '@clients/tests/clients.stub';

export const fakeModelExec = {
  exec: jest.fn().mockResolvedValue(stubClient()),
};

export const fakeModelSave = jest.fn();

export class FakeClientModel {
  constructor(private data: Client) {}
  save = fakeModelSave.mockResolvedValue(this.data);
  static findOne = jest.fn().mockReturnValue(fakeModelExec);
}
