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
  CategoryResponseDto,
  CreateCategoryRequestDto,
  UpdateCategoryRequestDto,
} from './dto';

import { CategoryService } from './category.service';
import {
  PermissionActions,
  PermissionResources,
} from '@access/permission/interfaces/permission.interface';
import { PaginationQueryDto } from '@common';
import { JwtGuard } from '@auth/guards';
import { PermissionGuard } from '@auth/guards/permissions.guard';

@Controller('category')
@UseGuards(JwtGuard)
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @ApiOperation({ description: 'Get a paginated Category list' })
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
    example: 'admin',
  })
  @Permission({
    resource: PermissionResources.CURRENCIES,
    action: PermissionActions.READ,
  })
  @UseGuards(PermissionGuard)
  @Get()
  public fetch(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<CategoryResponseDto[]> {
    return this.categoryService.fetchCategories(paginationQuery);
  }

  @ApiOperation({ description: 'Get Category by id' })
  @Permission({
    resource: PermissionResources.CURRENCIES,
    action: PermissionActions.READ,
  })
  @UseGuards(PermissionGuard)
  @Get('/:id')
  public getCategoryById(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<CategoryResponseDto> {
    return this.categoryService.fetchCategoryById(id);
  }

  @ApiOperation({
    description: 'Create new Category',
  })
  @ApiConflictResponse({ description: 'Category exists' })
  @Permission({
    resource: PermissionResources.CURRENCIES,
    action: PermissionActions.CREATE,
  })
  @UseGuards(PermissionGuard)
  @Post()
  public createCategory(
    @Body() CategoryDto: CreateCategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    return this.categoryService.create(CategoryDto);
  }

  @ApiOperation({ description: 'Update Category by id' })
  @ApiBadRequestResponse({
    description: "There's no Category with specified id",
  })
  @Permission({
    resource: PermissionResources.CURRENCIES,
    action: PermissionActions.UPDATE,
  })
  @UseGuards(PermissionGuard)
  @Put('/:id')
  public update(
    @Param('id') id: string,
    @Body() CategoryDto: UpdateCategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    return this.categoryService.update(id, CategoryDto);
  }
}
