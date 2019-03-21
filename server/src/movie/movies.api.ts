import { Company } from '../company/company';
import { TmdbApi } from '../core/tmdb-api';
import { Country } from '../country/country';
import { environment } from '../environment';
import { Language } from '../language/language';
import { KeyMap, remap } from '../util/remap';
import { Movie, MovieDetailed } from './movie';

export class MoviesAPI extends TmdbApi {
  baseURL = `${environment.apiUrl}/`;

  async nowPlaying(args: { page?: number; region?: string }): Promise<Movie[]> {
    const { ...rest } = args;
    return this.getResults<DbMovie>('movie/now_playing', { ...rest }).then(
      mapMovies
    );
  }

  async one(args: { id: number; region?: string }): Promise<MovieDetailed> {
    const { id, ...rest } = args;
    return this.get<DbMovie>(`movie/${id}`, { ...rest }).then(mapMovieDetailed);
  }

  async search(args: {
    title: string;
    page?: number;
    region?: string;
  }): Promise<Movie[]> {
    const { title: query, ...rest } = args;
    return this.getResults<DbMovie>('search/movie', { query, ...rest }).then(
      mapMovies
    );
  }
}

const mapImage = (size?: number) => {
  const width = size ? `w${size}` : 'original';
  return (path: string) => path && `${environment.imagesUrl}/${width}${path}`;
};
const mapCompany = remap<DbCompany, Company>({
  logoPath: ['logo', mapImage(500)],
});
const mapCountry = remap<DbCountry, Country>({
  iso31661: 'id',
});
const mapLanguage = remap<DbLanguage, Language>({
  iso6391: 'id',
});
const propMapBase: KeyMap<DbMovie, Movie> = {
  backdropPath: ['backdrop', mapImage()],
  overview: 'summary',
  posterPath: ['poster', mapImage(500)],
  voteAverage: 'score',
  voteCount: 'votes',
};
const mapMovie = remap<DbMovie, Movie>({ ...propMapBase, genreIds: 'genres' });
const mapMovies = (movies: DbMovie[]): Movie[] => movies.map(mapMovie);
const mapMovieDetailed = remap<DbMovie, MovieDetailed>({
  ...propMapBase,
  productionCompanies: c => c.map(mapCompany),
  productionCountries: c => c.map(mapCountry),
  spokenLanguages: l => l.map(mapLanguage),
});

interface DbMovie extends Partial<Movie> {
  backdropPath: string;
  genreIds: number[];
  overview: string;
  posterPath: string;
  productionCompanies: DbCompany[];
  productionCountries: DbCountry[];
  releaseDate: Date;
  spokenLanguages: DbLanguage[];
  voteAverage: number;
  voteCount: number;
}

interface DbCompany extends Partial<Company> {
  logoPath: string;
}

interface DbCountry extends Partial<Country> {
  iso31661: string;
}

interface DbLanguage extends Partial<Language> {
  iso6391: string;
}
