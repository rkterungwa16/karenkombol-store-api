import { ConflictException } from '@nestjs/common';
import { ErrorType } from '../error-type';

export class UserExistsException extends ConflictException {
  constructor(email: string) {
    super({
      errorType: ErrorType.UserExists,
      message: `There's a user with email '${email}'`,
    });
  }
}
