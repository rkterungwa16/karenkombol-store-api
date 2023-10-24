import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { User, UserSchema } from './schemas/user.schema';
import { Company, CompanySchema } from '@company/schema/company.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from '@access/role/schemas/role.schema';
import {
  Permission,
  PermissionSchema,
} from '@access/permission/schema/permission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersService,
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
