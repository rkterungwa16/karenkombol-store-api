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
import { KKConflictException, KKNotFoundException } from '@http/exceptions';
import { Pagination, PaginationResponseDto } from '@pagination';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}
  public async create(
    createCategoryRequestDto: CreateCategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    const name = createCategoryRequestDto.name.toLowerCase();
    const categoryExists = await this.categoryModel.findOne({
      name,
    });
    if (categoryExists) {
      throw new KKConflictException('category');
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
      const updatedCategory = await this.categoryModel.findByIdAndUpdate(
        id,
        updateCategoryRequestDto,
        { new: true },
      );
      return CategoryMapper.toDto(updatedCategory);
    } catch (e) {
      throw new KKNotFoundException('category');
    }
  }

  public async fetchCategoryById(id: string): Promise<CategoryResponseDto> {
    const category = await this.categoryModel.findById(id);
    if (!category) {
      throw new KKNotFoundException('category');
    }
    return CategoryMapper.toDto(category);
  }

  public async fetchCategories(
    paginationQuery,
  ): Promise<PaginationResponseDto<CategoryResponseDto[]>> {
    let data = [];
    const { limit, skip, filter } = paginationQuery;
    const totalRecords = await this.categoryModel.count();
    const categories = await this.categoryModel
      .find({
        ...(filter['$and'].length && { $and: filter['$and'] }),
      })
      .populate('image')
      .skip(skip)
      .limit(limit);
    if (categories.length) {
      data = categories.map((_category) => CategoryMapper.toDto(_category));
    }
    return Pagination.of({ limit, skip }, totalRecords, data);
  }
}
