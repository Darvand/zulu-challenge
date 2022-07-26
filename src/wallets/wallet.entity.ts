import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Types } from 'mongoose';

import { Client } from '@clients/entities/client.entity';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Wallet {
  @Exclude()
  @Prop({ type: Types.ObjectId, ref: Client.name, required: true })
  readonly client: Client | Types.ObjectId;

  @ApiProperty({ description: 'Current balance in USD', example: '3000' })
  @Prop()
  readonly usdBalance: number;

  @ApiProperty({ description: 'Current balance in Pesos', example: '20000000' })
  @Prop()
  readonly pesosBalance: number;

  constructor(client: Client, usdBalance: number, pesosBalance: number) {
    this.client = client;
    this.usdBalance = usdBalance;
    this.pesosBalance = pesosBalance;
  }
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
