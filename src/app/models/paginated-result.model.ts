export interface PaginatedResult<T> {
  items: T[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;

  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
