import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { extractPaginationDetails } from '@pagination';
import { SizeResponseDto } from './dto';
import { SizeQueryDto } from './dto/size-query.dto';
import { SizeService } from './size.service';

@Controller('size')
export class SizeController {
  constructor(private sizeService: SizeService) {}
  @Get()
  public fetchSizes(
    @Query(new ValidationPipe()) sizeQueryDto: SizeQueryDto,
  ): Promise<SizeResponseDto[]> {
    const pagination = extractPaginationDetails(sizeQueryDto);
    return this.sizeService.fetchSizes(pagination);
  }
}
