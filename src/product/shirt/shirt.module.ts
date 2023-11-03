import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '@user/user.module';
import { AccessModule } from '@access/access.module';
import { TokenModule } from '@auth/token.module';
import { Image, ImageSchema } from '@lib/image/schema/image.schema';
import { DBConnectionModule } from '@database/db-connection.module';
import { Shirt, ShirtSchema } from '@product/shirt/schema/shirt.schema';
import { ShirtStyle, ShirtStyleSchema } from './schema/shirt-style.schema';
import { ShirtController } from './shirt.controller';
import { ShirtService } from './shirt.service';
import { Category, CategorySchema } from '@product/category/schema';
import { ShirtStyleService } from './shirt-style.service';
import { ShirtStyleController } from './shirt-style.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([{ name: Shirt.name, schema: ShirtSchema }]),
    MongooseModule.forFeature([
      { name: ShirtStyle.name, schema: ShirtStyleSchema },
    ]),
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
    DBConnectionModule.register(),
    UsersModule,
    AccessModule,
    TokenModule,
    JwtModule,
  ],
  providers: [ShirtService, ShirtStyleService],
  exports: [
    MongooseModule.forFeature([{ name: Shirt.name, schema: ShirtSchema }]),
    MongooseModule.forFeature([
      { name: ShirtStyle.name, schema: ShirtStyleSchema },
    ]),
    ShirtService,
    ShirtStyleService,
  ],
  controllers: [ShirtController, ShirtStyleController],
})
export class ShirtModule {}
