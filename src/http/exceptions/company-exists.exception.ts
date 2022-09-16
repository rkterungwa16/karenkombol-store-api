import { ConflictException } from '@nestjs/common';
import { ErrorType } from '../error-type';

export class CompanyExistsException extends ConflictException {
  constructor(name: string) {
    super({
      errorType: ErrorType.CompanyExists,
      message: `There's a company with name '${name}'`,
    });
  }
}
