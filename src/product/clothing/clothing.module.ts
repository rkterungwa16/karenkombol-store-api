import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ClothingController } from './clothing.controller';
import { ClothingService } from './clothing.service';
import { Clothing, CategorySchema } from './schema';
import { UsersModule } from '@user/user.module';
import { AccessModule } from '@access/access.module';
import { TokenModule } from '@auth/token.module';
import { Image, ImageSchema } from '@lib/image/schema/image.schema';
import { DBConnectionModule } from '@database/db-connection.module';
import { Shirt, ShirtSchema } from '@product/shirt/schema/shirt.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Clothing.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([{ name: Shirt.name, schema: ShirtSchema }]),
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
    DBConnectionModule.register(),
    UsersModule,
    AccessModule,
    TokenModule,
    JwtModule,
  ],
  providers: [ClothingService],
  exports: [
    MongooseModule.forFeature([
      { name: Clothing.name, schema: CategorySchema },
    ]),
    ClothingService,
  ],
  controllers: [ClothingController],
})
export class ClothingModule {}
