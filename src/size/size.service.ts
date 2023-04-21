import { PaginationQueryDto } from '@common';
import {
  SizeDoesNotExistsException,
  SizeExistsException,
} from '@http/exceptions';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationRequest } from '@pagination';
import { Model, Types } from 'mongoose';
import {
  CreateSizeRequestDto,
  SizeResponseDto,
  UpdateSizeRequestDto,
} from './dto';
import { SizeQueryDto } from './dto/size-query.dto';
import { ISize } from './interface/size.interface';
import { SizeValue } from './schema/size-value.schema';
import { Size } from './schema/size.schema';
import { SizeValueMapper } from './size-value.mapper';
import { SizeMapper } from './size.mapper';

/**
 * List all sizes. List size values associated with type
 * One size type is associated with many size values
 * One size value is associated with on size type
 * Delete size value for a size type.
 * - API should pass both size id and sizeValue id
 * - Should be able to delete multiple sizeValues in one API call.
 * Delete a size type. Delete all associated size values.
 * - API should pass sizeId
 * Update size value for a size type.
 * - API should pass both sizeId and sizeValueId
 * - Should be able to update multiple sizeValues
 * Update size with its associated values.
 * If a user edits a size value, api finds that size value by id and applies edit.
 * - pass size value id and property to be edited.
 * If a user edits a size with size value.
 * - pass size id, pass size value id.
 * List sizes with array of size value objects.
 */

@Injectable()
export class SizeService {
  constructor(
    @InjectModel(Size.name) private readonly sizeModel: Model<Size>,
    @InjectModel(SizeValue.name)
    private readonly sizeValueModel: Model<SizeValue>,
  ) {}
  public async createSize(
    createSizeRequestDto: CreateSizeRequestDto,
  ): Promise<SizeResponseDto> {
    let newSize;
    const type = createSizeRequestDto.type.toLowerCase();
    const value = createSizeRequestDto.value;
    const sizeExists: ISize = await this.sizeModel.findOne({
      type,
    });
    if (sizeExists) {
      throw new SizeExistsException(type);
    }

    newSize = await this.sizeModel.create({
      type: createSizeRequestDto.type,
    });
    if (value) {
      const newSizeValue = await this.sizeValueModel.create({
        size: newSize._id,
        value,
      });
      newSize = await this.sizeModel
        .findByIdAndUpdate(
          newSize._id,
          {
            $push: {
              values: newSizeValue._id,
            },
          },
          { new: true },
        )
        .populate('values');

      newSize = newSize.toObject();
      newSize.values = newSize?.values.map((_v) => ({
        ...SizeValueMapper.toDto(_v),
      }));
    }

    return SizeMapper.toDto(newSize);
  }

  public async update(
    id: string,
    updateSizeRequestDto: UpdateSizeRequestDto,
  ): Promise<SizeResponseDto> {
    const { sizeValue, type } = updateSizeRequestDto;
    if (sizeValue) {
      const updatedSizeValue = await this.sizeValueModel.findOneAndUpdate(
        {
          _id: new Types.ObjectId(sizeValue.id),
          size: id,
        },
        {
          value: sizeValue.value,
        },
      );
      if (!updatedSizeValue) {
        throw new SizeDoesNotExistsException();
      }
    }
    const updatedSize: ISize = await this.sizeModel
      .findByIdAndUpdate(
        id,
        {
          type,
        },
        { new: true },
      )
      .populate('values');
    if (!updatedSize) {
      throw new SizeDoesNotExistsException();
    }
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
    paginationQuery: PaginationRequest,
  ): Promise<SizeResponseDto[]> {
    const { limit, skip, params } = paginationQuery;
    const dbFilter = Object.keys(params).map((key) => ({
      [key]: params[key],
    }));

    const sizes = await this.sizeModel
      .find({
        $or: dbFilter,
      })
      .skip(skip)
      .limit(limit);
    if (sizes.length) {
      return sizes.map((_size) => SizeMapper.toDto(_size));
    }
    return [];
  }
}
