import { HttpException, HttpStatus } from '@nestjs/common';

export class ClientAlreadyExistException extends HttpException {
  constructor() {
    super(`A client with the requested email is already registered`, HttpStatus.CONFLICT);
  }
}
