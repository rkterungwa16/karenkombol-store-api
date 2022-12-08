import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Color, ColorSchema } from './schema/color.schema';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { TokenService } from '@auth/token.service';
import { JwtService } from '@nestjs/jwt';
import { PermissionSchema } from '@access/permission/schema/permission.schema';
import { Role, RoleSchema } from '@access/role/schemas/role.schema';
import { Permission } from '@decorators';
import { User, UserSchema } from '@user/schemas/user.schema';

@Module({
  providers: [ColorService, TokenService, JwtService],
  controllers: [ColorController],
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
    MongooseModule.forFeature([{ name: Color.name, schema: ColorSchema }]),
  ],
})
export class ColorModule {}
