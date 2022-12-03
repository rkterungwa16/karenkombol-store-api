import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Color, ColorSchema } from './schema/color.schema';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';

@Module({
  providers: [ColorService],
  controllers: [ColorController],
  imports: [
    MongooseModule.forFeature([{ name: Color.name, schema: ColorSchema }]),
  ],
})
export class ColorModule {}
