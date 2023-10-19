import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, Connection } from 'mongoose';

import { Category } from './schema/category.schema';
import {
  CreateCategoryRequestDto,
  CategoryResponseDto,
  UpdateCategoryDto,
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
    @Inject('DATABASE_CONNECTION')
    private dbConnection: Connection,
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
    const session = await this.dbConnection.startSession();
    session.startTransaction();
    try {
      const name = createCategoryRequestDto.name;
      clothing = await this.clothingModel.findOne({
        name,
      });
      if (!clothing) {
        const clothings = await this.clothingModel.create(
          [
            {
              name,
            },
          ],
          { session },
        );
        clothing = clothings[0];
        // throw new KKConflictException('clothing');
      }
      category = await this.categoryModel.findOne({
        clothing: clothing?._id,
      });

      if (!category) {
        const categories = await this.categoryModel.create(
          [
            {
              clothing: clothing._id,
            },
          ],
          { session },
        );
        category = categories[0];
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
            const shirts = await this.shirtModel.create(
              [
                {
                  category: category._id,
                  ...createCategoryRequestDto.shirt,
                  image: image._id,
                },
              ],
              { session },
            );
            shirt = shirts[0];
          }
        }
        category = await this.categoryModel.findOne({
          shirt: shirt._id,
        });

        if (category) {
          throw new KKConflictException('category');
        }

        category = await this.categoryModel
          .findByIdAndUpdate(
            category._id,
            {
              shirt: shirt._id,
            },
            { new: true, session },
          )
          .populate({
            path: 'shirt',
            model: 'Shirt',
            populate: {
              path: 'image',
              model: 'Image',
            },
          })
          .populate('clothing');
        await session.commitTransaction();
        return CategoryMapper.toDto(category);
      } else {
        throw new KKNotFoundException('clothing');
      }
    } catch (e) {
      await session.abortTransaction();
      if (e?.message) {
        throw e;
      }
      throw new BadRequestException('category could not be created');
    } finally {
      await session.endSession();
    }
  }

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
        })
        .populate('clothing');
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
