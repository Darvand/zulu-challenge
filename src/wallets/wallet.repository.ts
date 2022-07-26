import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { inspect } from 'util';

import { Wallet } from '@wallets/wallet.entity';

@Injectable()
export class WalletsRepository {
  private readonly logger = new Logger(WalletsRepository.name);

  constructor(@InjectModel(Wallet.name) private walletModel: Model<Wallet>) {}

  save(wallet: Wallet): Promise<Wallet> {
    this.logger.log(`Attempting to save wallet`);
    const newWallet = new this.walletModel(wallet);
    this.logger.log(`Wallet successfully save with id [${newWallet.id}]`);
    return newWallet.save();
  }
}
