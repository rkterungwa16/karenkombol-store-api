import { PermissionSchema } from '@access/permission/schema/permission.schema';
import { Role, RoleSchema } from '@access/role/schemas/role.schema';
import { Color, ColorSchema } from '@color/schema/color.schema';
import { Permission } from '@decorators';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductColor,
  ProductColorSchema,
} from '@product/schema/product-color.schema';
import {
  ProductSize,
  ProductSizeSchema,
} from '@product/schema/product-size.schema';
import { Product, ProductSchema } from '@product/schema/product.schema';
import { SizeValue, SizeValueSchema } from '@size/schema/size-value.schema';
import { User, UserSchema } from '@user/schemas/user.schema';
import { VariantController } from './variant.controller';
import { VariantService } from './variant.service';
import { Variant, VariantSchema } from './schema/variant.schema';
import { ProductModule } from '@product/product.module';
import { UsersModule } from '@user/user.module';
import { AccessModule } from '@access/access.module';

@Module({
  providers: [VariantService],
  controllers: [VariantController],
  exports: [
    MongooseModule.forFeature([{ name: Variant.name, schema: VariantSchema }]),
    VariantService,
    MongooseModule.forFeature([
      { name: SizeValue.name, schema: SizeValueSchema },
    ]),
  ],
  imports: [
    ProductModule,
    UsersModule,
    AccessModule,
    MongooseModule.forFeature([{ name: Color.name, schema: ColorSchema }]),
  ],
})
export class VariantModule {}
