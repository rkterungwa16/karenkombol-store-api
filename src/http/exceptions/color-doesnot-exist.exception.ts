import { NotFoundException } from '@nestjs/common';
import { ErrorType } from '../error-type';

export class ColorDoesNotExistsException extends NotFoundException {
  constructor() {
    super({
      errorType: ErrorType.ColorDoesNotExist,
      message: 'color does not exist',
    });
  }
}
