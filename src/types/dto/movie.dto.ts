import { MovieFormat } from '../../models/enums/movie-format.enum';
import { MovieSortField } from '../../models/enums/movie-sort-format.enum';
import { SortOrder } from '../../models/enums/sort-order.enum';

export type CreateMovieDTO = {
  title: string;
  year: number;
  format: MovieFormat;
  actors: string[];
};

export type UpdateMovieDTO = Partial<CreateMovieDTO>;

export type MovieFiltersDTO = {
  title?: string;
  actor?: string;
  sort?: MovieSortField;
  order?: SortOrder;
  limit?: number;
  offset?: number;
};
