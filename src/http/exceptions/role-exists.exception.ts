import { ConflictException } from '@nestjs/common';
import { ErrorType } from '../error-type';

export class RoleExistsException extends ConflictException {
  constructor(name: string) {
    super({
      errorType: ErrorType.RoleExists,
      message: `Role with name '${name}' already exists`,
    });
  }
}
