import { ClientsService } from '@clients/clients.service';
import { RegisterClientDTO } from '@clients/dtos/register-client.dto';
import { Client } from '@clients/entities/client.entity';
import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: ClientsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() client: RegisterClientDTO): Promise<Client> {
    return this.service.register(client);
  }
}
