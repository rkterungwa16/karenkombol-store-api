import { ImageTypes } from '../constants';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Image extends Document {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, required: true })
  url: string;

  @Prop({ type: String, required: true })
  fileId: string;

  @Prop({
    type: String,
    enum: [...Object.values(ImageTypes)],
  })
  imageType?: ImageTypes;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
