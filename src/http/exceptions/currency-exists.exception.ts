import { ConflictException } from '@nestjs/common';
import { ErrorType } from '../error-type';

export class CurrencyExistsException extends ConflictException {
  constructor(code: string) {
    super({
      errorType: ErrorType.RoleExists,
      message: `There's a currency with code '${code}'`,
    });
  }
}
