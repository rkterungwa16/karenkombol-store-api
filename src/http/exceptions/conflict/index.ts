import { ConflictException } from '@nestjs/common';

export class KKConflictException extends ConflictException {
  constructor(model: string) {
    super({
      message: `${model} already exists`,
    });
  }
}
