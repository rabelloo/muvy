import { RouteArgs } from '../core/router';
import { store } from '../core/store';
import { movieApi } from '../movie/api';
import { Movie, MovieDetailed } from '../movie/interface';
import { MovieDetail } from '../movie/movie-detail';

const loaded = store
  .slice('movies')
  .case('[MovieDetailView] fetched movie')
  .reduce((movies, movie: Movie) => ({ ...movies, [movie.id]: movie }));

export const MovieDetailView = ({ state, params: { id } }: RouteArgs) => {
  const movie = state.movies[id];

  if (!movie) {
    movieApi.one(+id).then(loaded);
  }

  return MovieDetail(movie as MovieDetailed);
};
