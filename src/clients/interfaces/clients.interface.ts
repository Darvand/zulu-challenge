import { Client } from '@clients/entities/client.entity';

export interface ClientProps {
  email: Client['email'];
  password: Client['password'];
  name: Client['name'];
  documentID: Client['documentID'];
  address: Client['address'];
}
