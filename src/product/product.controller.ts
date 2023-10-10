import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiQuery,
  ApiConflictResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { Permission } from '@decorators';

import {
  ProductResponseDto,
  CreateProductRequestDto,
  UpdateProductRequestDto,
} from './dto';

import {
  PermissionActions,
  PermissionResources,
} from '@access/permission/interfaces/permission.interface';
import { PaginationQueryDto } from '@common';
import { JwtGuard } from '@auth/guards';
import { PermissionGuard } from '@auth/guards/permissions.guard';
import { ProductService } from './product.service';
import { PaginationResponseDto } from '@pagination';
import { ProductQueryWithFilterDto } from './dto/product-query.dto';

@Controller('product')
@UseGuards(JwtGuard)
export class ProductController {
  constructor(private productService: ProductService) {}
  @ApiOperation({ description: 'Get a paginated Products list' })
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
    example: 'admin',
  })
  @Get()
  public fetch(
    @Query() paginationQuery: ProductQueryWithFilterDto,
  ): Promise<PaginationResponseDto<ProductResponseDto[]>> {
    return this.productService.fetchProducts(paginationQuery);
  }

  @ApiOperation({ description: 'Get Product by id' })
  @Get('/:id')
  public getProductById(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<ProductResponseDto> {
    return this.productService.fetchProductById(id);
  }

  @ApiOperation({
    description: 'Create new Product',
  })
  @ApiConflictResponse({ description: 'Product exists' })
  @Permission({
    resource: PermissionResources.PRODUCTS,
    action: PermissionActions.CREATE,
  })
  @UseGuards(PermissionGuard)
  @Post()
  public createProduct(
    @Body() ProductDto: CreateProductRequestDto,
  ): Promise<ProductResponseDto> {
    return this.productService.create(ProductDto);
  }

  @ApiOperation({ description: 'Update Product by id' })
  @ApiBadRequestResponse({
    description: "There's no Product with specified id",
  })
  @Permission({
    resource: PermissionResources.CURRENCIES,
    action: PermissionActions.UPDATE,
  })
  @UseGuards(PermissionGuard)
  @Put('/:id')
  public update(
    @Param('id') id: string,
    @Body() ProductDto: UpdateProductRequestDto,
  ): Promise<ProductResponseDto> {
    return this.productService.update(id, ProductDto);
  }
}
