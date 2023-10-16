import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Category } from './schema/category.schema';
import {
  CreateCategoryRequestDto,
  CategoryResponseDto,
  UpdateCategoryRequestDto,
} from './dto';
import { CategoryMapper } from './mappers';
import { KKConflictException, KKNotFoundException } from '@http/exceptions';
import { Pagination, PaginationResponseDto } from '@pagination';
import { Shirt, Clothing } from './schema';
import { ClothingTypes } from './interface/category.interface';
import { Image } from '@lib/image/schema/image.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(Shirt.name) private readonly shirtModel: Model<Shirt>,
    @InjectModel(Clothing.name) private readonly clothingModel: Model<Clothing>,
    @InjectModel(Image.name) private readonly imageModel: Model<Image>,
  ) {}
  public async create(
    createCategoryRequestDto: CreateCategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    let clothing: Clothing & {
      _id: Types.ObjectId;
    };
    let category: Category & {
      _id: Types.ObjectId;
    };
    let shirt: Shirt & {
      _id: Types.ObjectId;
    };
    const name = createCategoryRequestDto.name;
    clothing = await this.clothingModel.findOne({
      name,
    });
    if (!clothing) {
      clothing = await this.clothingModel.create({
        name,
      });
      // throw new KKConflictException('clothing');
    }

    category = await this.categoryModel.findOne({
      clothing: clothing?._id,
    });

    if (!category) {
      category = await this.categoryModel.create({
        clothing: clothing._id,
      });
    }

    if (name === ClothingTypes.SHIRT) {
      shirt = await this.shirtModel.findOne({
        category: category._id,
      });

      if (!shirt) {
        let image;
        if (createCategoryRequestDto.shirt.image) {
          image = await this.imageModel.findById(
            createCategoryRequestDto.shirt.image,
          );
          if (!image) {
            throw new KKNotFoundException('image');
          }
        }
        shirt = await this.shirtModel.create({
          category: category._id,
          ...createCategoryRequestDto.shirt,
          image: image._id,
        });
      }
    }

    category = await this.categoryModel
      .findByIdAndUpdate(
        category._id,
        {
          $push: {
            shirts: shirt._id,
          },
        },
        { new: true },
      )
      .populate({
        path: 'shirts',
        model: 'Shirt',
        populate: {
          path: 'image',
          model: 'Image',
        },
      })
      .populate('clothing');
    return CategoryMapper.toDto(category);
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
