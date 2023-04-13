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

describe('SizeService', () => {
  let service: SizeService;
  let sizeModel: Model<Size>;
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
    const size = await setModelData(sizeModel).populate(createSize);
    console.log('size -->>', size);
  });

  afterAll(async () => {
    console.log('size model', sizeModel);
    await setModelData(sizeModel).reset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
