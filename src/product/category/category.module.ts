import { PermissionSchema } from '@access/permission/schema/permission.schema';
import { Role, RoleSchema } from '@access/role/schemas/role.schema';
import { TokenService } from '@auth/token.service';
import { Permission } from '@decorators';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@user/schemas/user.schema';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category, CategorySchema } from './schema/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  providers: [CategoryService, TokenService, JwtService],
  controllers: [CategoryController],
})
export class CategoryModule {}
