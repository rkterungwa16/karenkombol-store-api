import { PermissionSchema } from '@access/permission/schema/permission.schema';
import { Role, RoleSchema } from '@access/role/schemas/role.schema';
import { Permission } from '@decorators';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@user/schemas/user.schema';
import { CategoryModule } from './category/category.module';
import { Category, CategorySchema } from './category/schema/category.schema';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSchema, Product } from './schema/product.schema';
import { VariantModule } from './variant/variant.module';
import { TokenService } from '@auth/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ProductService, TokenService, JwtService],
  controllers: [ProductController],
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    CategoryModule,
    VariantModule,
  ],
  exports: [CategoryModule, VariantModule],
})
export class ProductModule {}
