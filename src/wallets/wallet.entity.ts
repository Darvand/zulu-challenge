import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Types } from 'mongoose';

import { Client } from '@clients/entities/client.entity';

@Schema()
export class Wallet {
  @Exclude()
  @Prop({ type: Types.ObjectId, ref: Client.name, required: true })
  readonly client: Client | Types.ObjectId;

  @Prop()
  readonly usdBalance: number;

  @Prop()
  readonly pesosBalance: number;

  constructor(client: Client, usdBalance: number, pesosBalance: number) {
    this.client = client;
    this.usdBalance = usdBalance;
    this.pesosBalance = pesosBalance;
  }
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
