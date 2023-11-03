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

    const { image_id, style_id, fit } = createShirtDto;

    category = await this.categoryModel.findOne({
      name: ClothingTypes.SHIRT,
    });

    if (!category) {
      category = await this.categoryModel.create({
        name: ClothingTypes.SHIRT,
      });
    }

    if (image_id) {
      image = await this.imageModel.findById(image_id);
      if (!image) {
        throw new KKNotFoundException('image');
      }
    }

    if (style_id) {
      style = await this.shirtStyleModel.findById(style_id);
      if (!style) {
        throw new KKNotFoundException('shirt style');
      }
    }

    // TODO: collar, sleeve
    // Check if shirt exists with these properties.
    shirt = await this.shirtModel.findOne({
      style: style_id,
      fit,
      'category.name': ClothingTypes.SHIRT,
    });

    if (!shirt) {
      shirt = await this.shirtModel.create({
        category: category._id,
        ...createShirtDto,
        image: image_id,
        style: style_id,
        fit,
      });
      shirt = await shirt.populate('image');
      shirt = await shirt.populate('category');
      shirt = await shirt.populate('style');
    } else {
      throw new KKConflictException('shirt');
    }

    category = await this.categoryModel.findByIdAndUpdate(category._id, {
      $push: {
        shirts: shirt._id,
      },
    });

    return ShirtMapper.toDto(shirt);
  }

  public async update(
    id: string,
    updateShirtDto: UpdateShirtDto,
  ): Promise<ShirtResponseDto> {
    try {
      const { image_id, style_id, category_id, ...others } = updateShirtDto;
      if (category_id) {
        const category = await this.imageModel.findById(category_id);
        if (!category) {
          throw new KKNotFoundException('category');
        }
      }

      if (image_id) {
        const image = await this.imageModel.findById(image_id);
        if (!image) {
          throw new KKNotFoundException('image');
        }
      }

      if (style_id) {
        const style = await this.shirtStyleModel.findById(style_id);
        if (!style) {
          throw new KKNotFoundException('shirt style');
        }
      }
      const shirt = await this.shirtModel
        .findByIdAndUpdate(
          id,
          {
            image: image_id,
            style: style_id,
            category: category_id,
            ...others,
          },
          { new: true },
        )
        .populate('image')
        .populate('category')
        .populate('style');
      return ShirtMapper.toDto(shirt);
    } catch (e) {
      throw new KKNotFoundException('shirt');
    }
  }

  public async fetchShirtById(id: string): Promise<ShirtResponseDto> {
    const shirt = await this.shirtModel
      .findById(id)
      .populate('image')
      .populate('category')
      .populate('style');
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
