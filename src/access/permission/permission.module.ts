import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { Permission, PermissionSchema } from './schema/permission.schema';
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
