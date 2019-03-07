import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { Response } from '../core/response';
import { environment } from '../environment';
import { Movie } from './movie';

export class MoviesAPI extends RESTDataSource {
  baseURL = `${environment.apiUrl}/movie/`;

  constructor() {
    super();
  }

  async getMovie(id: number) {
    return this.get(`${id}`);
  }

  async getNowPlaying(args: {
    page?: number;
    region?: string;
  }): Promise<Movie[]> {
    const data = await this.get<Response<DbMovie>>('now_playing', args);
    return data.results.map(mapMovie);
  }

  willSendRequest(request: RequestOptions) {
    request.params.set('api_key', environment.apiKey);
  }
}

function mapMovie(movie: DbMovie): Movie {
  const {
    backdrop_path,
    genre_ids,
    original_language,
    original_title,
    overview,
    poster_path,
    release_date,
    vote_average,
    vote_count,
    ...rest
  } = movie;

  return {
    ...rest,
    backdrop: backdrop_path,
    genres: genre_ids,
    originalLanguage: original_language,
    originalTitle: original_title,
    summary: overview,
    poster: `${environment.imagesUrl}/w500${poster_path}`,
    releaseDate: release_date,
    votes: vote_count,
    score: vote_average,
  } as Movie;
}

interface DbMovie {
  adult: false;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
