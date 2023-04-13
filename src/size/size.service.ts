import { PaginationQueryDto } from '@common';
import {
  SizeDoesNotExistsException,
  SizeExistsException,
} from '@http/exceptions';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateSizeRequestDto,
  SizeResponseDto,
  UpdateSizeRequestDto,
} from './dto';
import { ISize } from './interface/size.interface';
import { Size } from './schema/size.schema';
import { SizeMapper } from './size.mapper';

@Injectable()
export class SizeService {
  constructor(
    @InjectModel(Size.name) private readonly sizeModel: Model<Size>,
  ) {}
  public async createSize(
    createSizeRequestDto: CreateSizeRequestDto,
  ): Promise<SizeResponseDto> {
    const type = createSizeRequestDto.type.toLowerCase();
    const sizeExists: ISize = await this.sizeModel.findOne({
      type,
    });
    if (sizeExists) {
      throw new SizeExistsException(type);
    }

    const newSize = await this.sizeModel.create({
      type: createSizeRequestDto.type,
      values: [createSizeRequestDto.value],
    });
    return SizeMapper.toDto(newSize);
  }

  public async update(
    id: string,
    updateSizeRequestDto: UpdateSizeRequestDto,
  ): Promise<SizeResponseDto> {
    const { value, type } = updateSizeRequestDto;
    const sizeValueExists = await this.sizeModel.findOne({
      id,
      values: value,
    });
    if (sizeValueExists) {
      throw new SizeExistsException(sizeValueExists.type, value);
    }
    const updatedSize: ISize = await this.sizeModel.findByIdAndUpdate(
      id,
      {
        type,
        $push: {
          values: value,
        },
      },
      { new: true },
    );
    return SizeMapper.toDto(updatedSize);
  }

  public async fetchSizeById(id: string): Promise<SizeResponseDto> {
    const size: ISize = await this.sizeModel.findById(id);
    if (!size) {
      throw new SizeDoesNotExistsException();
    }
    return SizeMapper.toDto(size);
  }

  public async fetchSizes(
    paginationQuery: PaginationQueryDto,
  ): Promise<SizeResponseDto[]> {
    const { limit, offset } = paginationQuery;
    const sizes: ISize[] = await this.sizeModel
      .find()
      .skip(offset)
      .limit(limit);
    if (sizes.length) {
      return sizes.map((_size) => SizeMapper.toDto(_size));
    }
    return [];
  }
}
