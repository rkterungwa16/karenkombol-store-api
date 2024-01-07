import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  AgeGroup,
  BodyType,
  Gender,
  HeightGroup,
} from '../interface/category.interface';

@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({
    type: String,
    lowercase: true,
    required: true,
    text: true,
    enum: [...Object.values(Gender)],
  })
  gender: string | Gender;

  @Prop({
    type: String,
    text: true,
    index: true,
    required: true,
    lowercase: true,
    enum: [...Object.values(AgeGroup)],
  })
  ageGroup?: string | AgeGroup;

  @Prop({
    type: String,
    text: true,
    index: true,
    required: true,
    lowercase: true,
    enum: [...Object.values(BodyType)],
  })
  bodyType?: string | BodyType;

  @Prop({
    type: String,
    text: true,
    index: true,
    required: true,
    lowercase: true,
    enum: [...Object.values(HeightGroup)],
  })
  heightGroup?: string | HeightGroup;

  createdAt?: Date;
  updatedAt?: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
