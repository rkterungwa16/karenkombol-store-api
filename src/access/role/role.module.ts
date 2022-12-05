import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './schemas/role.schema';
import { Company, CompanySchema } from '@company/schema/company.schema';
import { TokenService } from '@auth/token.service';
import { User, UserSchema } from '@user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import {
  Permission,
  PermissionSchema,
} from '@access/permission/schema/permission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  providers: [RoleService, TokenService, JwtService],
  controllers: [RoleController],
  // TODO: The idea is to make these components available to all modules that depend on it in the application.
  // exports: [
  //   MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  //   MongooseModule.forFeature([
  //     { name: Permission.name, schema: PermissionSchema },
  //   ]),
  // ],
})
export class RoleModule {}
