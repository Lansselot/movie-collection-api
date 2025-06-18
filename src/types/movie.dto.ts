import { MovieFormat } from '../models/enums/movie-format.enum';

export type CreateMovieDTO = {
  title: string;
  year: number;
  format: MovieFormat;
  actors: string[];
};

export type UpdateMovieDTO = Partial<CreateMovieDTO>;
