import { Injectable } from '@nestjs/common';

import { ClientsService } from '@clients/clients.service';
import { Wallet } from '@wallets/wallet.entity';
import { WalletsRepository } from '@wallets/wallet.repository';

@Injectable()
export class WalletsService {
  constructor(private readonly repository: WalletsRepository, private readonly clientsService: ClientsService) {}

  async save(clientId: string): Promise<Wallet> {
    const client = await this.clientsService.findById(clientId);
    const initialWallet = { usdBalance: 0, pesosBalance: 0, client };
    const wallet = await this.repository.save(initialWallet);
    return new Wallet(client, wallet.usdBalance, wallet.pesosBalance);
  }
}
