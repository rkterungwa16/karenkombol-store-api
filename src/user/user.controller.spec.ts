import {
  Permission,
  PermissionSchema,
} from '@access/permission/schema/permission.schema';
import { Role, RoleSchema } from '@access/role/schemas/role.schema';
import { Company, CompanySchema } from '@company/schema/company.schema';
import { DatabaseModule } from '@database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
      imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([
          { name: Company.name, schema: CompanySchema },
        ]),
        MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
        MongooseModule.forFeature([
          { name: Permission.name, schema: PermissionSchema },
        ]),
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        DatabaseModule,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
