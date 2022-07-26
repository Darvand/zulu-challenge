import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ClientsModule } from '@clients/clients.module';
import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { LocalStrategy } from '@auth/strategies/local.strategy';
import { ConfigType } from '@nestjs/config';
import { config } from 'src/config';

@Module({
  controllers: [AuthController],
  imports: [
    ClientsModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { secret, expiresIn } = configService.jwt;
        return {
          secret,
          signOptions: { expiresIn },
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
