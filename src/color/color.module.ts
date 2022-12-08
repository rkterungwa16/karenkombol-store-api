import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Color, ColorSchema } from './schema/color.schema';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { TokenService } from '@auth/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ColorService, TokenService, JwtService],
  controllers: [ColorController],
  imports: [
    MongooseModule.forFeature([{ name: Color.name, schema: ColorSchema }]),
  ],
})
export class ColorModule {}
