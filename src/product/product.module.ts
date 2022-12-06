import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { VariantModule } from './variant/variant.module';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  exports: [CategoryModule, VariantModule],
})
export class ProductModule {}
