import { faker } from '@faker-js/faker';

import { Client } from '@clients/entities/client.entity';
import { RegisterClientDTO } from '@clients/dtos/register-client.dto';

export const stubClient = (): Client => {
  return new Client({
    email: faker.internet.email(),
    address: faker.address.direction(),
    documentID: `${faker.datatype.number({ min: 1000, max: 9999 })}`,
    name: faker.name.firstName(),
    password: faker.datatype.string(6),
  });
};

export const stubRegisterClientDTO = (client?: Client): RegisterClientDTO => {
  const fromClient = client || stubClient();
  return {
    ...fromClient,
    document_id: fromClient.documentID,
  };
};
