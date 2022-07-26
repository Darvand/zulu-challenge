import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
  private readonly logger = new Logger(InvalidCredentialsException.name);

  constructor() {
    super(`Either email or password is not correct`, HttpStatus.UNAUTHORIZED);
    this.logger.error('Invalid credentials for requested login');
  }
}
