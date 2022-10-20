import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { Permission, PermissionSchema } from './schema/permission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
})
export class PermissionModule {}
