import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClothingModule } from './clothing/clothing.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSchema, Product } from './schema/product.schema';
import { JwtModule } from '@nestjs/jwt';
import { ImageModule } from 'src/lib/image/image.module';
import { UsersModule } from '@user/user.module';
import {
  ProductColor,
  ProductColorSchema,
} from './schema/product-color.schema';
import { ProductSize, ProductSizeSchema } from './schema/product-size.schema';
import { TokenModule } from '@auth/token.module';
import { AccessModule } from '@access/access.module';
import { ShirtModule } from './shirt/shirt.module';
import { CategoryModule } from './category/category.module';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([
      { name: ProductSize.name, schema: ProductSizeSchema },
    ]),
    MongooseModule.forFeature([
      { name: ProductColor.name, schema: ProductColorSchema },
    ]),
    ClothingModule,
    ShirtModule,
    ImageModule,
    UsersModule,
    TokenModule,
    JwtModule,
    AccessModule,
    CategoryModule,
  ],
  exports: [
    ProductService,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([
      { name: ProductSize.name, schema: ProductSizeSchema },
    ]),
    MongooseModule.forFeature([
      { name: ProductColor.name, schema: ProductColorSchema },
    ]),
    ClothingModule,
    ShirtModule,
    CategoryModule,
  ],
})
export class ProductModule {}
