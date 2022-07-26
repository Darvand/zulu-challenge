import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';

import { ClientProps } from '@clients/interfaces/clients.interface';
import { Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export type ClientDocument = Client & { _id: Types.ObjectId };

@Schema()
export class Client {
  @ApiProperty({ description: 'The client email', example: 'example@email.com' })
  @Prop({ required: true, unique: true })
  readonly email: string;

  @Exclude()
  @Prop({ required: true })
  readonly password: string;

  @ApiPropertyOptional({ description: 'The client full name', example: 'Darvand Frovonwill' })
  @Prop()
  readonly name: string;

  @ApiPropertyOptional({ description: 'National id document', example: '10204059302' })
  @Prop({ name: 'document_id' })
  readonly documentID: string;

  @ApiPropertyOptional({ description: 'Client address', example: 'Kra 24 # 24 - 32 ' })
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
