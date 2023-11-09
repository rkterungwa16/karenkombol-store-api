import { PaginationResponseDto } from './pagination-response.dto';
import { PaginationRequest } from './pagination-request.interface';

export class Pagination {
  static of<T>(
    { limit = 10, page, skip = 0 }: PaginationRequest,
    totalRecords: number,
    data: T,
  ): PaginationResponseDto<T> {
    const totalPages =
      Math.floor(totalRecords / limit) + (totalRecords % limit > 0 ? 1 : 0);
    const currentPage = page > 0 ? page : 1;
    const hasNext = currentPage <= totalPages - 1;

    return {
      data,
      status: 200,
      message: 'success',
      pagination: {
        totalPages,
        currentPage: currentPage,
        skip,
        totalRecords: totalRecords,
        hasNext,
      },
    };
  }
}
