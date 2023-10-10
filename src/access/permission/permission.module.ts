import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@user/schemas/user.schema';
import { TokenService } from '@auth/token.service';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { Permission, PermissionSchema } from './schema/permission.schema';
import { Role, RoleSchema } from '@access/role/schemas/role.schema';
import { RoleModule } from '@access/role/role.module';
import { UsersModule } from '@user/user.module';
import { TokenModule } from '@auth/token.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
    UsersModule,
    TokenModule,
    JwtModule,
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
    PermissionService,
  ],
})
export class PermissionModule {}
