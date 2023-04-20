import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Size, SizeSchema } from './schema/size.schema';
import { TokenService } from '@auth/token.service';
import { User, UserSchema } from '@user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import {
  Permission,
  PermissionSchema,
} from '@access/permission/schema/permission.schema';
import { Role, RoleSchema } from '@access/role/schemas/role.schema';
import { SizeService } from './size.service';
import { SizeController } from './size.controller';
import { SizeValue, SizeValueSchema } from './schema/size-value.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Size.name, schema: SizeSchema }]),
    MongooseModule.forFeature([
      { name: SizeValue.name, schema: SizeValueSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  providers: [SizeService, TokenService, JwtService],
  controllers: [SizeController],
})
export class SizeModule {}
