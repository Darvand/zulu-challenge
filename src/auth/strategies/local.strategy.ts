import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '@auth/auth.service';
import { InvalidCredentialsException } from '@auth/exceptions/invalid-credentials.exception';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }
  async validate(email: string, password: string): Promise<any> {
    console.log('validate');
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new InvalidCredentialsException();
    }
    return user;
  }
}
