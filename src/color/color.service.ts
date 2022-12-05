import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Color } from './schema/color.schema';
import {
  ColorResponseDto,
  CreateColorRequestDto,
  UpdateColorRequestDto,
} from './dto';
import { ColorMapper } from './color.mapper';
import {
  RoleDoesNotExistsException,
  RoleExistsException,
} from '@http/exceptions';
import { PaginationQueryDto } from '@common';
import { IColor } from './interface/color.interface';

@Injectable()
export class ColorService {
  constructor(
    @InjectModel(Color.name) private readonly colorModel: Model<Color>,
  ) {}
  public async createColor(
    createColorRequestDto: CreateColorRequestDto,
  ): Promise<ColorResponseDto> {
    const name = createColorRequestDto.name.toLowerCase();
    const hexCode = createColorRequestDto.hexCode.toLowerCase();
    const colorExists = await this.colorModel.findOne({
      hexCode,
    });
    if (colorExists) {
      throw new RoleExistsException(hexCode);
    }

    const newColor: IColor = await this.colorModel.create({
      name,
      hexCode,
    });
    return ColorMapper.toDto(newColor);
  }

  public async update(
    id: string,
    updateColorRequestDto: UpdateColorRequestDto,
  ): Promise<ColorResponseDto> {
    try {
      const updatedColor: IColor = await this.colorModel.findByIdAndUpdate(
        id,
        updateColorRequestDto,
      );
      return ColorMapper.toDto(updatedColor);
    } catch (e) {
      throw new RoleDoesNotExistsException();
    }
  }

  public async fetchColorById(id: string): Promise<ColorResponseDto> {
    const color: IColor = await this.colorModel.findById(id);
    if (!color) {
      throw new NotFoundException();
    }
    return ColorMapper.toDto(color);
  }

  public async fetchColors(
    paginationQuery: PaginationQueryDto,
  ): Promise<ColorResponseDto[]> {
    const { limit, offset } = paginationQuery;
    const colors: IColor[] = await this.colorModel
      .find()
      .skip(offset)
      .limit(limit);
    if (colors.length) {
      return colors.map((_color) => ColorMapper.toDto(_color));
    }
    return [];
  }
}
