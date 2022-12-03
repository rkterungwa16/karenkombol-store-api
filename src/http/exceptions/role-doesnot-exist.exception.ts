import { NotFoundException } from '@nestjs/common';
import { ErrorType } from '../error-type';

export class RoleDoesNotExistsException extends NotFoundException {
  constructor() {
    super({
      errorType: ErrorType.RoleDoesNotExist,
      message: `role does not exist`,
    });
  }
}
