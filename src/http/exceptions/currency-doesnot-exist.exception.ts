import { NotFoundException } from '@nestjs/common';
import { ErrorType } from '../error-type';

export class CurrencyDoesNotExistsException extends NotFoundException {
  constructor() {
    super({
      errorType: ErrorType.CurrencyDoesNotExist,
      message: `There's no role with id'`,
    });
  }
}
