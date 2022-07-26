import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';

import { ClientProps } from '@clients/interfaces/clients.interface';

@Schema()
export class Client {
  @Prop({ required: true, unique: true })
  readonly email: string;

  @Exclude()
  @Prop({ required: true })
  readonly password: string;

  @Prop()
  readonly name: string;

  @Prop({ name: 'document_id' })
  readonly documentID: string;

  @Prop()
  readonly address: string;

  constructor(clientProps: ClientProps) {
    if (clientProps) {
      this.email = clientProps.email;
      this.password = clientProps.password;
      this.name = clientProps.name;
      this.documentID = clientProps.documentID;
      this.address = clientProps.address;
    }
  }
}

export const ClientSchema = SchemaFactory.createForClass(Client);
