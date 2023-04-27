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

@Module({
  providers: [VariantService],
  controllers: [VariantController],
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([
      { name: SizeValue.name, schema: SizeValueSchema },
    ]),
    MongooseModule.forFeature([
      { name: ProductSize.name, schema: ProductSizeSchema },
    ]),
    MongooseModule.forFeature([
      { name: ProductColor.name, schema: ProductColorSchema },
    ]),
    MongooseModule.forFeature([{ name: Color.name, schema: ColorSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
})
export class VariantModule {}
