import { NotFoundException } from '@nestjs/common';
import { ErrorType } from '../error-type';

export class RoleDoesNotExistsException extends NotFoundException {
  constructor() {
    super({
      errorType: ErrorType.RoleExists,
      message: `There's no role with id'`,
    });
  }
}
