import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, Connection } from 'mongoose';

import { Clothing } from './schema/clothing.schema';
import {
  CreateClothingDto,
  ClothingResponseDto,
  UpdateClothingDto,
} from './dto';
import { ClothingMapper } from './mappers';
import { KKConflictException, KKNotFoundException } from '@http/exceptions';
import { Pagination, PaginationResponseDto } from '@pagination';

@Injectable()
export class ClothingService {
  constructor(
    @InjectModel(Clothing.name) private readonly clothingModel: Model<Clothing>,
  ) {}
  public async create(
    createClothingDto: CreateClothingDto,
  ): Promise<ClothingResponseDto> {
    let clothing: Clothing & {
      _id: Types.ObjectId;
    };
    const name = createClothingDto.name;
    clothing = await this.clothingModel.findOne({
      name,
    });
    if (!clothing) {
      clothing = await this.clothingModel.create({
        name,
      });
    } else {
      throw new KKConflictException('clothing');
    }
    return ClothingMapper.toDto(clothing);
  }

  // public async create(
  //   createClothingDto: CreateClothingDto,
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
  //     const name = createClothingDto.name;
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
  //       shirt = await this.shirtModel.findById(createClothingDto.shirt);
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
    updateClothingRequestDto: UpdateClothingDto,
  ): Promise<ClothingResponseDto> {
    try {
      const updatedClothing = await this.clothingModel
        .findByIdAndUpdate(id, updateClothingRequestDto, { new: true })
        .populate({
          path: 'shirts',
          model: 'Shirt',
          populate: {
            path: 'image',
            model: 'Image',
          },
        });
      return ClothingMapper.toDto(updatedClothing);
    } catch (e) {
      throw new KKNotFoundException('clothing');
    }
  }

  public async fetchClothingById(id: string): Promise<ClothingResponseDto> {
    const clothing = await this.clothingModel
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
    if (!clothing) {
      throw new KKNotFoundException('clothing');
    }
    return ClothingMapper.toDto(clothing);
  }

  public async fetchClothings(
    paginationQuery,
  ): Promise<PaginationResponseDto<ClothingResponseDto[]>> {
    let data = [];
    const { limit, skip, filter } = paginationQuery;
    const totalRecords = await this.clothingModel.count();
    const clothings = await this.clothingModel
      .find({
        ...(filter['$and'].length && { $and: filter['$and'] }),
      })
      .populate('image')
      .skip(skip)
      .limit(limit);
    if (clothings.length) {
      data = clothings.map((_clothing) => ClothingMapper.toDto(_clothing));
    }
    return Pagination.of({ limit, skip }, totalRecords, data);
  }
}
