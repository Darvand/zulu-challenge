import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WalletsService } from '@wallets/wallets.service';
import { WalletsController } from '@wallets/wallets.controller';
import { WalletsRepository } from '@wallets/wallet.repository';
import { Wallet, WalletSchema } from '@wallets/wallet.entity';
import { ClientsModule } from '@clients/clients.module';

@Module({
  imports: [
    ClientsModule,
    MongooseModule.forFeature([
      {
        name: Wallet.name,
        schema: WalletSchema,
      },
    ]),
  ],
  providers: [WalletsService, WalletsRepository],
  controllers: [WalletsController],
})
export class WalletsModule {}
