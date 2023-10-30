import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { KKNotFoundException } from '@http/exceptions';
import { Pagination, PaginationResponseDto } from '@pagination';
import { Shirt } from './schema/shirt.schema';
import { Image } from '@lib/image/schema/image.schema';
import { CreateShirtDto } from './dto/create-shirt.dto';
import { ShirtMapper } from './shirt.mapper';
import { UpdateShirtDto } from './dto/update-shirt.dto';
import { ShirtResponseDto } from './dto/shirt-response.dto';

@Injectable()
export class ShirtService {
  constructor(
    @InjectModel(Shirt.name) private readonly shirtModel: Model<Shirt>,
    @InjectModel(Image.name) private readonly imageModel: Model<Image>,
  ) {}
  public async create(
    createShirtDto: CreateShirtDto,
  ): Promise<ShirtResponseDto> {
    let shirt: Shirt & {
      _id: Types.ObjectId;
    };
    let image;
    if (createShirtDto.image) {
      image = await this.imageModel.findById(createShirtDto.image);
      if (!image) {
        throw new KKNotFoundException('image');
      }
    }
    shirt = await this.shirtModel.create({
      ...createShirtDto,
      image: image._id,
    });
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
        .populate('image');
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
      .skip(skip)
      .limit(limit);
    if (shirts.length) {
      data = shirts.map((_shirt) => ShirtMapper.toDto(_shirt));
    }
    return Pagination.of({ limit, skip }, totalRecords, data);
  }
}
