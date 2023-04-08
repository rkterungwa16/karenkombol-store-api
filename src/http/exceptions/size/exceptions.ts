import { ConflictException, NotFoundException } from '@nestjs/common';
import { ErrorType } from '../../error-type';

export class SizeExistsException extends ConflictException {
  constructor(type: string) {
    super({
      errorType: ErrorType.SizeExists,
      message: `There's a size of type '${type}'`,
    });
  }
}

export class SizeDoesNotExistsException extends NotFoundException {
  constructor() {
    super({
      errorType: ErrorType.CurrencyDoesNotExist,
      message: 'currency does not exist',
    });
  }
}
