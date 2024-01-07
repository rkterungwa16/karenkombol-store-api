import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Category } from './schema/category.schema';
import {
  CreateCategoryDto,
  CategoryResponseDto,
  UpdateCategoryDto,
} from './dto';
import { CategoryMapper } from './mappers';
import { KKConflictException, KKNotFoundException } from '@http/exceptions';
import { Pagination, PaginationResponseDto } from '@pagination';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}
  public async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryResponseDto> {
    let category: Category & {
      _id: Types.ObjectId;
    };
    const gender = createCategoryDto.gender;
    const bodyType = createCategoryDto.bodyType;
    const heightGroup = createCategoryDto.heightGroup;
    const ageGroup = createCategoryDto.ageGroup;

    category = await this.categoryModel.findOne({
      gender,
      bodyType,
      heightGroup,
      ageGroup,
    });
    if (!category) {
      category = await this.categoryModel.create({
        name,
      });
    } else {
      throw new KKConflictException('category');
    }
    return CategoryMapper.toDto(category);
  }

  public async update(
    id: string,
    updateCategoryRequestDto: UpdateCategoryDto,
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
      .skip(skip)
      .limit(limit);
    if (categories.length) {
      data = categories.map((_category) => CategoryMapper.toDto(_category));
    }
    return Pagination.of({ limit, skip }, totalRecords, data);
  }
}
