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
import { ClothingService } from './clothing.service';
import { Clothing, CategorySchema } from './schema/clothing.schema';
import { KKConflictException } from '@http/exceptions';
import { ClothingTypes } from './interface/clothing.interface';

describe('ClothingService', () => {
  let service: ClothingService;
  let clothingModel: Model<Clothing>;
  let clothing;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClothingService,
        {
          provide: getModelToken('Category'),
          useFactory: (connection: Connection) => {
            const model = connection.model(Clothing.name, CategorySchema);
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

    service = module.get<ClothingService>(ClothingService);
    clothingModel = module.get(getModelToken('Category'));
    clothing = await setModelData(clothingModel).populate({
      name: 'male',
    });
  });

  afterAll(async () => {
    await setModelData<Clothing>(clothingModel).reset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const result = await service.create({
        name: ClothingTypes.SHIRTS,
      });
      expect(result.name).toEqual('female');
    });

    it('should throw error if category already exists', async () => {
      await expect(
        service.create({
          name: ClothingTypes.SHIRTS,
        }),
      ).rejects.toThrow(new KKConflictException('category'));
    });
  });

  describe('update', () => {
    it('should update existing category', async () => {
      const result = await service.update(clothing._id, {
        description: 'items for men',
      });
      expect(result.description).toEqual('items for men');
    });
  });
});
