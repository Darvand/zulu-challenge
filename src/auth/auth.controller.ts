import { Body, ClassSerializerInterceptor, Controller, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';

import { ClientsService } from '@clients/clients.service';
import { RegisterClientDTO } from '@clients/dtos/register-client.dto';
import { Client } from '@clients/entities/client.entity';
import { AuthService } from '@auth/auth.service';
import { LocalAuthGuard } from '@auth/guards/local.auth.guard';
import { ApiConflictResponse, ApiCreatedResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: ClientsService, private authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new client' })
  @ApiCreatedResponse({ type: Client })
  @ApiConflictResponse({ description: 'Client with requested email already exists' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() client: RegisterClientDTO): Promise<Client> {
    return this.service.register(client);
  }

  @ApiOperation({ summary: 'Login endpoint. I know, is missing the DTO for this one ' })
  @ApiCreatedResponse({ description: 'Successfully login' })
  @ApiUnauthorizedResponse({ description: 'Email or password not valid' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
