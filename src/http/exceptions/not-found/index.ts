import { NotFoundException } from '@nestjs/common';

export class KKNotFoundException extends NotFoundException {
  constructor(model: string) {
    super({
      message: `${model} does not exist`,
    });
  }
}
