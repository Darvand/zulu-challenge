import { Body, ClassSerializerInterceptor, Controller, Post, Put, Request, UseGuards, UseInterceptors } from '@nestjs/common';

import { Wallet } from '@wallets/wallet.entity';
import { WalletsService } from '@wallets/wallets.service';
import { JwtAuthGuard } from '@auth/guards/jwt.auth.guard';
import { UpdateBalanceDTO } from './update-balance.dto';

@UseGuards(JwtAuthGuard)
@Controller('wallets')
export class WalletsController {
  constructor(private readonly service: WalletsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  save(@Request() req): Promise<Wallet> {
    return this.service.save(req.user.id);
  }

  @Put()
  updateBalance(@Body() dto: UpdateBalanceDTO): Promise<Wallet> {
    // TODO: Check if current user is the owner of the requested wallet
    return this.service.update(dto);
  }
}
