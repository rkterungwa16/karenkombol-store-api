import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Size } from '@size/schema/size.schema';

export class SizeModel {
  constructor(
    @InjectModel(Size.name) private readonly sizeModel: Model<Size>,
  ) {}
}
