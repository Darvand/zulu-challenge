import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

import { Wallet } from '@wallets/wallet.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBalanceDTO {
  @ApiProperty({ description: 'Wallet identification', example: '62df9486ad3578ea512ce5b9b' })
  @IsString()
  @IsNotEmpty()
  readonly walletID: string;

  @ApiProperty({ description: 'New USD balance to update', example: '3000' })
  @IsNumber()
  @IsNotEmpty()
  @ValidateIf((dto) => {
    console.log('validate if', dto, !dto.pesosBalance, dto.usdBalance);
    return !dto.pesosBalance || dto.usdBalance;
  })
  readonly usdBalance: Wallet['usdBalance'];

  @ApiProperty({ description: 'New Pesos balance to update', example: '20000000' })
  @IsNumber()
  @IsNotEmpty()
  @ValidateIf((dto) => !dto.usdBalance || dto.pesosBalance)
  readonly pesosBalance: Wallet['pesosBalance'];
}
