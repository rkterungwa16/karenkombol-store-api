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
import { PaginationResponseDto, ResponseDto } from '@pagination';
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
  public async getCategoryById(
    @Param('id') id: string,
  ): Promise<ResponseDto<CategoryResponseDto>> {
    const data = await this.categoryService.fetchCategoryById(id);
    return {
      status: 200,
      data,
      message: 'success',
    };
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
  public async createCategory(
    @Body() CategoryDto: CreateCategoryDto,
  ): Promise<ResponseDto<CategoryResponseDto>> {
    const data = await this.categoryService.create(CategoryDto);
    return {
      status: 201,
      data,
      message: 'success',
    };
  }

  @ApiOperation({ description: 'Update Category by id' })
  @ApiBadRequestResponse({
    description: "There's no Category with specified id",
  })
  @Permission({
    resource: PermissionResources.CATEGORIES,
    action: PermissionActionsTypes.UPDATE,
  })
  @UseGuards(PermissionGuard)
  @Put('/:id')
  public async update(
    @Param('id') id: string,
    @Body() categoryDto: UpdateCategoryDto,
  ): Promise<ResponseDto<CategoryResponseDto>> {
    const data = await this.categoryService.update(id, categoryDto);
    return {
      status: 200,
      data,
      message: 'success',
    };
  }
}
