import { NotFoundException } from '@nestjs/common';
import { ErrorType } from '../error-type';

export class ProductDoesNotExistsException extends NotFoundException {
  constructor() {
    super({
      errorType: ErrorType.ProductDoesNotExist,
      message: 'product does not exist',
    });
  }
}
