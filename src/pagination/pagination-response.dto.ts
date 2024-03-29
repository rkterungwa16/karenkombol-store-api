export class PaginationResponseDto<T> {
  pagination?: PaginationMetaType;
  data: T;
  status?: number;
  message?: string;
}

export type PaginationMetaType = {
  currentPage: number;
  skip: number;
  totalPages: number;
  totalRecords: number;
  hasNext: boolean;
};

export class ResponseDto<T> {
  data: T;
  status?: number;
  message?: string;
}
