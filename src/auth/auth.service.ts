import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ClientsService } from '@clients/clients.service';
import { SharedUtils } from '@shared/shared.utils';
import { Client } from '@clients/entities/client.entity';

@Injectable()
export class AuthService {
  constructor(private readonly clientsService: ClientsService, private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const clientFound = await this.clientsService.findByEmail(email);
    console.log('clientFound', clientFound, password);
    const isPasswordValid = await SharedUtils.compare(password, clientFound?.password || '');
    if (clientFound && isPasswordValid) {
      const { password: _, ...result } = new Client(clientFound);
      return result;
    }
    return null;
  }

  async login(client: Client) {
    return {
      access_token: this.jwtService.sign(client),
    };
  }
}
