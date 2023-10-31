import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, Connection } from 'mongoose';

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
    @Inject('DATABASE_CONNECTION')
    private dbConnection: Connection,
  ) {}
  public async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryResponseDto> {
    let category: Category & {
      _id: Types.ObjectId;
    };
    const name = createCategoryDto.name;
    category = await this.categoryModel.findOne({
      name,
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

  // public async create(
  //   createCategoryDto: CreateCategoryDto,
  // ): Promise<CategoryResponseDto> {
  //   let category: Category & {
  //     _id: Types.ObjectId;
  //   };
  //   let shirt: Shirt & {
  //     _id: Types.ObjectId;
  //   };
  //   const session = await this.dbConnection.startSession();
  //   session.startTransaction();
  //   try {
  //     const name = createCategoryDto.name;
  //     category = await this.categoryModel.findOne({
  //       name,
  //     });
  //     if (!category) {
  //       const categories = await this.categoryModel.create(
  //         [
  //           {
  //             name,
  //           },
  //         ],
  //         { session },
  //       );
  //       category = categories[0];
  //       // throw new KKConflictException('clothing');
  //     }
  //     // Shirt categories
  //     if (category.name === ClothingTypes.SHIRT) {
  //       shirt = await this.shirtModel.findById(createCategoryDto.shirt);
  //       if (!shirt) {
  //         throw new KKConflictException('category');
  //       }
  //       if (shirt?.category !== category._id) {
  //         throw new KKConflictException('shirt');
  //       }

  //       category = await this.categoryModel
  //         .findByIdAndUpdate(
  //           category._id,
  //           {
  //             $push: {
  //               shirts: shirt._id,
  //             },
  //           },
  //           { new: true, session },
  //         )
  //         .populate({
  //           path: 'shirt',
  //           model: 'Shirt',
  //           populate: {
  //             path: 'image',
  //             model: 'Image',
  //           },
  //         })
  //         .populate('clothing');
  //       await session.commitTransaction();
  //       return CategoryMapper.toDto(category);
  //     } else {
  //       throw new KKNotFoundException('clothing');
  //     }
  //   } catch (e) {
  //     await session.abortTransaction();
  //     if (e?.message) {
  //       throw e;
  //     }
  //     throw new BadRequestException('category could not be created');
  //   } finally {
  //     await session.endSession();
  //   }
  // }

  public async update(
    id: string,
    updateCategoryRequestDto: UpdateCategoryDto,
  ): Promise<CategoryResponseDto> {
    try {
      const updatedCategory = await this.categoryModel
        .findByIdAndUpdate(id, updateCategoryRequestDto, { new: true })
        .populate({
          path: 'shirts',
          model: 'Shirt',
          populate: {
            path: 'image',
            model: 'Image',
          },
        });
      return CategoryMapper.toDto(updatedCategory);
    } catch (e) {
      throw new KKNotFoundException('category');
    }
  }

  public async fetchCategoryById(id: string): Promise<CategoryResponseDto> {
    const category = await this.categoryModel
      .findById(id)
      .populate({
        path: 'shirt',
        model: 'Shirt',
        populate: {
          path: 'image',
          model: 'Image',
        },
      })
      .populate('clothing');
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
