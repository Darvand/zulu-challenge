import { Body, ClassSerializerInterceptor, Controller, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';

import { ClientsService } from '@clients/clients.service';
import { RegisterClientDTO } from '@clients/dtos/register-client.dto';
import { Client } from '@clients/entities/client.entity';
import { AuthService } from '@auth/auth.service';
import { LocalAuthGuard } from '@auth/guards/local.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: ClientsService, private authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() client: RegisterClientDTO): Promise<Client> {
    return this.service.register(client);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
