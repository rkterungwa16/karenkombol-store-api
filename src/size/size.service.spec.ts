import { DatabaseModule } from '@database/database.module';
import { ConfigModule } from '@nestjs/config';
import { Model, Connection } from 'mongoose';
import {
  getModelToken,
  MongooseModule,
  getConnectionToken,
} from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { setModelData } from '../test/model';
import { Size, SizeSchema } from './schema/size.schema';
import { SizeService } from './size.service';
import { createSize } from '../test/fixtures';
import { SizeExistsException } from '@http/exceptions';
import { SizeValue, SizeValueSchema } from './schema/size-value.schema';

describe('SizeService', () => {
  let service: SizeService;
  let sizeModel: Model<Size>;
  let sizeValueModel: Model<SizeValue>;
  let size;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SizeService,
        {
          provide: getModelToken('Size'),
          useFactory: (connection: Connection) => {
            const model = connection.model(Size.name, SizeSchema);
            return model;
          },
          inject: [getConnectionToken('DatabaseConnection')],
        },
        {
          provide: getModelToken('SizeValue'),
          useFactory: (connection: Connection) => {
            const model = connection.model(SizeValue.name, SizeValueSchema);
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

    service = module.get<SizeService>(SizeService);
    sizeModel = module.get(getModelToken('Size'));
    sizeValueModel = module.get(getModelToken('SizeValue'));
    size = await setModelData(sizeModel).populate(createSize);
  });

  afterAll(async () => {
    await setModelData<Size>(sizeModel).reset();
    await setModelData<SizeValue>(sizeValueModel).reset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new size', async () => {
      const result = await service.createSize({
        type: 'French size',
        value: 36,
      });
      expect(result.values.find((_v) => _v.value)).toBeTruthy();
      expect(result.type).toEqual('French size');
    });
  });

  // describe('update', () => {
  //   it('should update size', async () => {
  //     const result = await service.update(size._id, {
  //       value: 'SM',
  //     });

  //     expect(result.values).toMatchObject(['XS', 'SM']);
  //     expect(result.type).toEqual('General Size');
  //   });

  //   it('should throw error for existing size value', async () => {
  //     await expect(
  //       service.update(size._id, {
  //         value: 'XS',
  //       }),
  //     ).rejects.toThrow(new SizeExistsException('General Size', 'XS'));
  //   });
  // });
});
