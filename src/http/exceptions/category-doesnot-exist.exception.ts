import { NotFoundException } from '@nestjs/common';
import { ErrorType } from '../error-type';

export class CategoryDoesNotExistsException extends NotFoundException {
  constructor() {
    super({
      errorType: ErrorType.CategoryDoesNotExist,
      message: 'category does not exist',
    });
  }
}
