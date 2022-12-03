import { NotFoundException } from '@nestjs/common';
import { ErrorType } from '../error-type';

export class ColorExistsException extends NotFoundException {
  constructor() {
    super({
      errorType: ErrorType.ColorExists,
      message: 'color already exists',
    });
  }
}
