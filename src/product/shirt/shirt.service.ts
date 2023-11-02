import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { KKConflictException, KKNotFoundException } from '@http/exceptions';
import { Pagination, PaginationResponseDto } from '@pagination';
import { Shirt } from './schema/shirt.schema';
import { Image } from '@lib/image/schema/image.schema';
import { CreateShirtDto } from './dto/create-shirt.dto';
import { ShirtMapper } from './mapper';
import { UpdateShirtDto } from './dto/update-shirt.dto';
import { ShirtResponseDto } from './dto/shirt-response.dto';
import { Category } from '@product/category/schema';
import { ClothingTypes } from '@product/interface/category.interface';
import { ShirtStyle } from './schema/shirt-style.schema';

@Injectable()
export class ShirtService {
  constructor(
    @InjectModel(Shirt.name) private readonly shirtModel: Model<Shirt>,
    @InjectModel(Image.name) private readonly imageModel: Model<Image>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(ShirtStyle.name)
    private readonly shirtStyleModel: Model<ShirtStyle>,
  ) {}
  public async create(
    createShirtDto: CreateShirtDto,
  ): Promise<ShirtResponseDto> {
    let category: Category & {
      _id: Types.ObjectId;
    };
    let shirt: Shirt & {
      _id: Types.ObjectId;
    };
    let style: ShirtStyle & {
      _id: Types.ObjectId;
    };

    let image: Image & {
      _id: Types.ObjectId;
    };

    category = await this.categoryModel.findOne({
      name: ClothingTypes.SHIRT,
    });

    if (!category) {
      category = await this.categoryModel.create({
        name: ClothingTypes.SHIRT,
      });
    }

    if (createShirtDto?.image) {
      image = await this.imageModel.findById(createShirtDto.image);
      if (!image) {
        throw new KKNotFoundException('image');
      }
    }

    if (createShirtDto.style) {
      style = await this.shirtStyleModel.findById(createShirtDto.style);
      if (!style) {
        throw new KKNotFoundException('shirt style');
      }
    }

    // TODO: collar, sleeve
    // Check if shirt exists with these properties.
    shirt = await this.shirtModel.findOne({
      style: style._id,
      fit: createShirtDto.fit,
      'category.name': ClothingTypes.SHIRT,
    });

    if (!shirt) {
      shirt = await this.shirtModel.create({
        category: category._id,
        ...createShirtDto,
        image: image._id,
      });
    } else {
      throw new KKConflictException('shirt');
    }

    category = await this.categoryModel.findByIdAndUpdate(
      category._id,
      {
        $push: {
          shirts: shirt._id,
        },
      },
      { new: true },
    );
    shirt = await shirt.populate('image');
    return ShirtMapper.toDto(shirt);
  }

  public async update(
    id: string,
    updateShirtDto: UpdateShirtDto,
  ): Promise<ShirtResponseDto> {
    try {
      let image;
      if (updateShirtDto.image) {
        image = await this.imageModel.findById(updateShirtDto.image);
        if (!image) {
          throw new KKNotFoundException('image');
        }
      }
      const shirt = await this.shirtModel
        .findByIdAndUpdate(id, updateShirtDto, { new: true })
        .populate('image')
        .populate('category')
        .populate('style');
      return ShirtMapper.toDto(shirt);
    } catch (e) {
      throw new KKNotFoundException('shirt');
    }
  }

  public async fetchShirtById(id: string): Promise<ShirtResponseDto> {
    const shirt = await this.shirtModel.findById(id).populate('image');
    if (!shirt) {
      throw new KKNotFoundException('shirt');
    }
    return ShirtMapper.toDto(shirt);
  }

  public async fetchShirts(
    paginationQuery,
  ): Promise<PaginationResponseDto<ShirtResponseDto[]>> {
    let data = [];
    const { limit, skip, filter } = paginationQuery;
    const totalRecords = await this.shirtModel.count();
    const shirts = await this.shirtModel
      .find({
        ...(filter['$and'].length && { $and: filter['$and'] }),
      })
      .populate('image')
      .populate('category')
      .populate('style')
      .skip(skip)
      .limit(limit);
    if (shirts.length) {
      data = shirts.map((_shirt) => ShirtMapper.toDto(_shirt));
    }
    return Pagination.of({ limit, skip }, totalRecords, data);
  }
}
