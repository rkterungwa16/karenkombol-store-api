import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category, CategorySchema } from './schema/category.schema';
import { UsersModule } from '@user/user.module';
import { AccessModule } from '@access/access.module';
import { TokenModule } from '@auth/token.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    UsersModule,
    AccessModule,
    TokenModule,
    JwtModule,
  ],
  providers: [CategoryService],
  exports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    CategoryService,
  ],
  controllers: [CategoryController],
})
export class CategoryModule {}
