import { ConflictException } from '@nestjs/common';
import { ErrorType } from '../error-type';

export class CategoryExistsException extends ConflictException {
  constructor() {
    super({
      errorType: ErrorType.CategoryExists,
      message: 'Category already exists',
    });
  }
}
