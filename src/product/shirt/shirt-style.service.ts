import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { KKConflictException, KKNotFoundException } from '@http/exceptions';
import { Pagination, PaginationResponseDto } from '@pagination';
import { ShirtStyle } from './schema/shirt-style.schema';
import { CreateShirtStyleDto } from './dto/create-shirt-style.dto';
import { ShirtStyleResponseDto } from './dto/shirt-style-response.dto';
import { ShirtStyleMapper } from './mapper/shirt-style.mapper';
import { UpdateShirtStyleDto } from './dto/update-shirt-style.dto';

@Injectable()
export class ShirtStyleService {
  constructor(
    @InjectModel(ShirtStyle.name)
    private readonly shirtStyleModel: Model<ShirtStyle>,
  ) {}
  public async create(
    shirtStyleDto: CreateShirtStyleDto,
  ): Promise<ShirtStyleResponseDto> {
    let style: ShirtStyle & {
      _id: Types.ObjectId;
    };
    const { name, description } = shirtStyleDto;
    style = await this.shirtStyleModel.findOne({
      name,
    });
    if (!style) {
      style = await this.shirtStyleModel.create({
        name,
        description,
      });
    } else {
      throw new KKConflictException('shirt style');
    }
    return ShirtStyleMapper.toDto(style);
  }

  public async update(
    id: string,
    updateShirtStyleDto: UpdateShirtStyleDto,
  ): Promise<ShirtStyleResponseDto> {
    try {
      const style = await this.shirtStyleModel.findByIdAndUpdate(
        id,
        updateShirtStyleDto,
        { new: true },
      );
      return ShirtStyleMapper.toDto(style);
    } catch (e) {
      throw new KKNotFoundException('style');
    }
  }

  public async fetchShirtStyleById(id: string): Promise<ShirtStyleResponseDto> {
    const style = await this.shirtStyleModel.findById(id);
    if (!style) {
      throw new KKNotFoundException('style');
    }
    return ShirtStyleMapper.toDto(style);
  }

  public async fetchShirtStyles(
    paginationQuery,
  ): Promise<PaginationResponseDto<ShirtStyleResponseDto[]>> {
    let data = [];
    const { limit, skip, filter } = paginationQuery;
    const totalRecords = await this.shirtStyleModel.count();
    const styles = await this.shirtStyleModel
      .find({
        ...(filter['$and'].length && { $and: filter['$and'] }),
      })
      .skip(skip)
      .limit(limit);
    if (styles.length) {
      data = styles.map((_style) => ShirtStyleMapper.toDto(_style));
    }
    return Pagination.of({ limit, skip }, totalRecords, data);
  }
}
