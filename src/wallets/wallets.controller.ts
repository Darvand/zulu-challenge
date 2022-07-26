import { ClassSerializerInterceptor, Controller, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';

import { Wallet } from '@wallets/wallet.entity';
import { WalletsService } from '@wallets/wallets.service';
import { JwtAuthGuard } from '@auth/guards/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('wallets')
export class WalletsController {
  constructor(private readonly service: WalletsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  save(@Request() req): Promise<Wallet> {
    return this.service.save(req.user.id);
  }
}
