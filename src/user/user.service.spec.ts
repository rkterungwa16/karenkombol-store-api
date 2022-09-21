import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from './user.service';
import {
  TestPermissionModel,
  TestRoleModel,
  TestUserModel,
  TestCompanyModel,
} from '../test/mocks';

import { User } from './schemas/user.schema';

import { DatabaseModule } from '@database/database.module';
import { UserExistsException } from '@http/exceptions';

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
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

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  it('user service should be defined', () => {
    expect(service).toBeDefined();
  });
  it('user model should be defined', () => {
    expect(model).toBeDefined();
  });
  it('should create user', async () => {
    const exampleCreatedUser = {
      companyName: 'example',
      email: 'test@example.com',
      password: '@Test12345',
    };
    jest.spyOn(model, 'create').mockReturnValueOnce({
      populate: jest.fn().mockReturnThis(),
      ...exampleCreatedUser,
    } as any);
    const createdUser = await service.create({
      ...exampleCreatedUser,
    });

    expect(createdUser.email).toEqual('test@example.com');
  });
  it('should throw exeception for existing user', async () => {
    const exampleCreatedUser = {
      companyName: 'example',
      email: 'test@example.com',
      password: '@Test12345',
    };
    jest.spyOn(model, 'findOne').mockReturnValueOnce({
      ...exampleCreatedUser,
    } as any);

    await expect(
      service.create({
        ...exampleCreatedUser,
      }),
    ).rejects.toThrow(new UserExistsException(exampleCreatedUser.email));
  });
});
