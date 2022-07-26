import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

import { Wallet } from '@wallets/wallet.entity';

export class UpdateBalanceDTO {
  @IsString()
  @IsNotEmpty()
  readonly walletID: string;

  @IsNumber()
  @IsNotEmpty()
  @ValidateIf((dto) => {
    console.log('validate if', dto, !dto.pesosBalance, dto.usdBalance);
    return !dto.pesosBalance || dto.usdBalance;
  })
  readonly usdBalance: Wallet['usdBalance'];

  @IsNumber()
  @IsNotEmpty()
  @ValidateIf((dto) => !dto.usdBalance || dto.pesosBalance)
  readonly pesosBalance: Wallet['pesosBalance'];
}
