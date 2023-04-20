import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { PaginationParams } from '@pagination';
import { SizeResponseDto } from './dto';
import { SizeQueryDto } from './dto/size-query.dto';
import { SizeService } from './size.service';

@Controller('size')
export class SizeController {
  constructor(private sizeService: SizeService) {}
  @Get()
  public fetchSizes(
    @Query(new ValidationPipe()) sizeQueryDto: SizeQueryDto,
    @PaginationParams() pagination: any,
  ): Promise<SizeResponseDto[]> {
    console.log('query -->>', sizeQueryDto);
    console.log('pagination -->>', pagination);
    return this.sizeService.fetchSizes(pagination);
  }
}
