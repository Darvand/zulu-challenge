import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Wallet } from '@wallets/wallet.entity';
import { UpdateBalanceDTO } from '@wallets/update-balance.dto';

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

  update(id: string, changes: Omit<UpdateBalanceDTO, 'walletID'>) {
    const wallet = this.walletModel.findByIdAndUpdate(id, { $set: changes }, { new: true }).exec();
    if (!wallet) {
      throw new NotFoundException(`Wallet with id [${id}] not found`);
    }
    return wallet;
  }
}
