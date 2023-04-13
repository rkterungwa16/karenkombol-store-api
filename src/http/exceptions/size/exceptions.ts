import { ConflictException, NotFoundException } from '@nestjs/common';
import { ErrorType } from '../../error-type';

export class SizeExistsException extends ConflictException {
  constructor(type: string, value?: string | number) {
    super({
      errorType: ErrorType.SizeExists,
      message: `There's a size of type '${type}' ${
        value ? `and value ${value}` : ''
      }`,
    });
  }
}

export class SizeDoesNotExistsException extends NotFoundException {
  constructor() {
    super({
      errorType: ErrorType.SizeDoesNotExist,
      message: 'size does not exist',
    });
  }
}
