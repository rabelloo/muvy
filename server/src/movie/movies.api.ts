import { remap } from '../core/remap';
import { TmdbApi } from '../core/tmdb-api';
import { environment } from '../environment';
import { Movie } from './movie';

export class MoviesAPI extends TmdbApi {
  baseURL = `${environment.apiUrl}/movie/`;

  async getMovie(id: number) {
    return this.get(`${id}`);
  }

  async getNowPlaying(args: {
    page?: number;
    region?: string;
  }): Promise<Movie[]> {
    return this.getResults<DbMovie>('now_playing', args).then(mapMovies);
  }
}

const mapImage = (path: string) => `${environment.imagesUrl}/w500${path}`;
const dbMovieMapper = remap<DbMovie, Movie>({
  backdropPath: ['backdrop', mapImage],
  genreIds: 'genres',
  overview: 'summary',
  posterPath: ['poster', mapImage],
  voteAverage: 'score',
  voteCount: 'votes',
});

function mapMovies(movies: DbMovie[]): Movie[] {
  return movies.map(dbMovieMapper);
}

interface DbMovie extends Partial<Movie> {
  backdropPath: string;
  genreIds: number[];
  overview: string;
  posterPath: string;
  releaseDate: Date;
  voteAverage: number;
  voteCount: number;
}
