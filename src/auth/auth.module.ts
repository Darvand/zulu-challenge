import { ClientsModule } from '@clients/clients.module';
import { Module } from '@nestjs/common';

import { AuthController } from '@auth/auth.controller';

@Module({
  controllers: [AuthController],
  imports: [ClientsModule],
})
export class AuthModule {}
