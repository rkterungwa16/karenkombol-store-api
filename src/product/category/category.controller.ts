import {
  Body,
  Controller,
  Get,
  Param,
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
  CreateCategoryDto,
  UpdateCategoryDto,
} from './dto';

import { CategoryService } from './category.service';
import {
  PermissionActionsTypes,
  PermissionResources,
} from '@access/permission/interfaces/permission.interface';
import { JwtGuard } from '@auth/guards';
import { PermissionGuard } from '@auth/guards/permissions.guard';
import { PaginationResponseDto } from '@pagination';
import { CategoryQueryWithFilterDto } from './dto/category-query.dto';

@Controller('categories')
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
    resource: PermissionResources.CATEGORIES,
    action: PermissionActionsTypes.CREATE,
  })
  @UseGuards(PermissionGuard)
  @Get()
  public fetch(
    @Query() paginationQuery: CategoryQueryWithFilterDto,
  ): Promise<PaginationResponseDto<CategoryResponseDto[]>> {
    return this.categoryService.fetchCategories(paginationQuery);
  }

  @ApiOperation({ description: 'Get Category by id' })
  @Permission({
    resource: PermissionResources.CATEGORIES,
    action: PermissionActionsTypes.CREATE,
  })
  @UseGuards(PermissionGuard)
  @Get('/:id')
  public getCategoryById(
    @Param('id') id: string,
  ): Promise<CategoryResponseDto> {
    return this.categoryService.fetchCategoryById(id);
  }

  @ApiOperation({
    description: 'Create new Category',
  })
  @ApiConflictResponse({ description: 'Category exists' })
  @Permission({
    resource: PermissionResources.CATEGORIES,
    action: PermissionActionsTypes.CREATE,
  })
  @UseGuards(PermissionGuard)
  @Post()
  public createCategory(
    @Body() CategoryDto: CreateCategoryDto,
  ): Promise<CategoryResponseDto> {
    return this.categoryService.create(CategoryDto);
  }

  @ApiOperation({ description: 'Update Category by id' })
  @ApiBadRequestResponse({
    description: "There's no Category with specified id",
  })
  @Permission({
    resource: PermissionResources.CURRENCIES,
    action: PermissionActionsTypes.UPDATE,
  })
  @UseGuards(PermissionGuard)
  @Put('/:id')
  public update(
    @Param('id') id: string,
    @Body() categoryDto: UpdateCategoryDto,
  ): Promise<CategoryResponseDto> {
    return this.categoryService.update(id, categoryDto);
  }
}
