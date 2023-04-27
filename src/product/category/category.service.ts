import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from './schema/category.schema';
import {
  CreateCategoryRequestDto,
  CategoryResponseDto,
  UpdateCategoryRequestDto,
} from './dto';
import { CategoryMapper } from './category.mapper';
import {
  CategoryDoesNotExistsException,
  CategoryExistsException,
} from '@http/exceptions';
import { PaginationQueryDto } from '@common';
import { ICategory } from './interface/category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}
  public async create(
    createCategoryRequestDto: CreateCategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    const name = createCategoryRequestDto.name.toLowerCase();
    const categoryExists: ICategory = await this.categoryModel.findOne({
      name,
    });
    if (categoryExists) {
      throw new CategoryExistsException();
    }

    const newCategory = await this.categoryModel.create({
      name,
      description: createCategoryRequestDto.description,
      imageUrl: createCategoryRequestDto.imageUrl,
    });
    return CategoryMapper.toDto(newCategory);
  }

  public async update(
    id: string,
    updateCategoryRequestDto: UpdateCategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    try {
      const updatedCategory: ICategory =
        await this.categoryModel.findByIdAndUpdate(
          id,
          updateCategoryRequestDto,
          { new: true },
        );
      return CategoryMapper.toDto(updatedCategory);
    } catch (e) {
      throw new CategoryDoesNotExistsException();
    }
  }

  public async fetchCategoryById(id: string): Promise<CategoryResponseDto> {
    const category: ICategory = await this.categoryModel.findById(id);
    if (!category) {
      throw new CategoryDoesNotExistsException();
    }
    return CategoryMapper.toDto(category);
  }

  public async fetchCategories(
    paginationQuery: PaginationQueryDto,
  ): Promise<CategoryResponseDto[]> {
    const { limit, offset } = paginationQuery;
    const categories: ICategory[] = await this.categoryModel
      .find()
      .skip(offset)
      .limit(limit);
    if (categories.length) {
      return categories.map((_category) => CategoryMapper.toDto(_category));
    }
    return [];
  }
}
