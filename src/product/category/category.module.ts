import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import {
  Category,
  CategorySchema,
  Clothing,
  ClothingSchema,
  Shirt,
  ShirtSchema,
} from './schema';
import { UsersModule } from '@user/user.module';
import { AccessModule } from '@access/access.module';
import { TokenModule } from '@auth/token.module';
import { Image, ImageSchema } from '@lib/image/schema/image.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([
      { name: Clothing.name, schema: ClothingSchema },
    ]),
    MongooseModule.forFeature([{ name: Shirt.name, schema: ShirtSchema }]),
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
    UsersModule,
    AccessModule,
    TokenModule,
    JwtModule,
  ],
  providers: [CategoryService],
  exports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([
      { name: Clothing.name, schema: ClothingSchema },
    ]),
    MongooseModule.forFeature([{ name: Shirt.name, schema: ShirtSchema }]),
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
    CategoryService,
  ],
  controllers: [CategoryController],
})
export class CategoryModule {}
