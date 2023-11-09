export interface PaginationRequest {
  // Number of records to skip (where the pagination shall start)
  skip?: number;
  // The index of the page where the pagination should start from.
  // Needed to handle the pagination by the current page index
  page?: number;

  // Page size
  limit?: number;

  // Sort order
  orderBy?: { [field: string]: PaginationSortOrder };

  // Other params of type T
  params?: {
    search?: string;
    [param: string]: string | string[];
  };

  filter?: () => [];
}

export type PaginationSortOrder = 'asc' | 'desc';
export const mapPaginationSortOrder = {
  asc: 1,
  desc: -1,
};
