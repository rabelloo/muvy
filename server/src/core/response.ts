export interface Response<T> {
  dates: { maximum: Date; minimum: Date };
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
