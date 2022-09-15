import { UnauthorizedException } from '@nestjs/common';

import { ErrorType } from '../error-type';

export class DisabledUserException extends UnauthorizedException {
  constructor(errorType: ErrorType) {
    super({
      errorType,
      message: 'User not authorized to login',
    });
  }
}
