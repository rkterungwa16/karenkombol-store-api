import {
  getConnectionToken,
  getModelToken,
  MongooseModule,
} from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { DatabaseModule } from '@database/database.module';
import { ConfigModule } from '@nestjs/config';

import { Test, TestingModule } from '@nestjs/testing';
import { Size, SizeSchema } from '@size/schema/size.schema';
import { setModelData } from '../../test/model';
import { CategoryService } from './category.service';
import { Category, CategorySchema } from './schema/category.schema';
import { CategoryExistsException } from '@http/exceptions';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryModel: Model<Category>;
  let category;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getModelToken('Category'),
          useFactory: (connection: Connection) => {
            const model = connection.model(Category.name, CategorySchema);
            return model;
          },
          inject: [getConnectionToken('DatabaseConnection')],
        },
      ],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        DatabaseModule,
        MongooseModule.forFeature([{ name: Size.name, schema: SizeSchema }]),
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryModel = module.get(getModelToken('Category'));
    category = await setModelData(categoryModel).populate({
      name: 'male',
    });
  });

  afterAll(async () => {
    await setModelData<Category>(categoryModel).reset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const result = await service.create({
        name: 'female',
      });
      expect(result.name).toEqual('female');
    });

    it('should throw error if category already exists', async () => {
      await expect(
        service.create({
          name: 'female',
        }),
      ).rejects.toThrow(new CategoryExistsException());
    });
  });
});
