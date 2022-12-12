import { ConflictException } from '@nestjs/common';
import { ErrorType } from '../error-type';

export class ProductExistsException extends ConflictException {
  constructor() {
    super({
      errorType: ErrorType.ProductExists,
      message: 'product already exists',
    });
  }
}
