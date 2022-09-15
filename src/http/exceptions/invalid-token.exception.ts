import { UnauthorizedException } from '@nestjs/common';
import { ErrorType } from '../error-type';

export class InvalidTokenException extends UnauthorizedException {
  constructor() {
    super({ errorType: ErrorType.InvalidToken });
  }
}
