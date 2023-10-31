import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category, CategorySchema } from './schema';
import { UsersModule } from '@user/user.module';
import { AccessModule } from '@access/access.module';
import { TokenModule } from '@auth/token.module';
import { Image, ImageSchema } from '@lib/image/schema/image.schema';
import { DBConnectionModule } from '@database/db-connection.module';
import { Shirt, ShirtSchema } from '@product/shirt/schema/shirt.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([{ name: Shirt.name, schema: ShirtSchema }]),
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
    DBConnectionModule.register(),
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
    MongooseModule.forFeature([{ name: Shirt.name, schema: ShirtSchema }]),
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
    CategoryService,
  ],
  controllers: [CategoryController],
})
export class CategoryModule {}
