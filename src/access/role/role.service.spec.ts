import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TestPermissionModel,
  TestRoleModel,
  TestUserModel,
  TestCompanyModel,
} from '../../test/mocks';

import { Role } from './schemas/role.schema';

import { DatabaseModule } from '@database/database.module';
import {
  RoleExistsException,
  RoleDoesNotExistsException,
} from '@http/exceptions';
import { RoleService } from './role.service';
import { createdCompany, createdRole } from '../../test/fixtures';
import { CreateRoleRequestDto } from './dto/create-role-request.dto';
import { Company } from '@company/schema/company.schema';

describe('RolesService', () => {
  let service: RoleService;
  let roleModel: Model<Role>;
  let companyModel: Model<Company>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: getModelToken('Company'),
          useClass: TestCompanyModel,
        },
        {
          provide: getModelToken('User'),
          useClass: TestUserModel,
        },
        {
          provide: getModelToken('Permission'),
          useClass: TestPermissionModel,
        },
        {
          provide: getModelToken('Role'),
          useClass: TestRoleModel,
        },
      ],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        DatabaseModule,
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
    roleModel = module.get<Model<Role>>(getModelToken('Role'));
    companyModel = module.get<Model<Company>>(getModelToken('Company'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create role', async () => {
    jest.spyOn(roleModel, 'create').mockReturnValueOnce({
      populate: jest.fn().mockReturnThis(),
      ...createdRole,
    } as any);
    jest.spyOn(companyModel, 'findById').mockReturnValueOnce({
      populate: jest.fn().mockReturnThis(),
      ...createdCompany,
    } as any);
    const newCreatedRole = await service.create({
      ...createdRole,
    });

    expect(newCreatedRole.name).toEqual(createdRole.name);
  });
});
