import { DynamicModule } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

export class DBConnectionModule {
  static register(): DynamicModule {
    return {
      module: DBConnectionModule,
      providers: [
        {
          provide: 'DATABASE_CONNECTION',
          useFactory: (connection: Connection) => connection,
          inject: [getConnectionToken('DatabaseConnection')],
        },
      ],
      exports: [
        {
          provide: 'DATABASE_CONNECTION',
          useFactory: (connection: Connection) => connection,
          inject: [getConnectionToken('DatabaseConnection')],
        },
      ],
    };
  }
}
