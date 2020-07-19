import { Company } from './company';
import { Country } from './country';
import { Genre } from './genre';
import { Language } from './language';

export interface Movie {
  id: number;
  adult: boolean;
  backdrop: string;
  genres: number[] | Genre[];
  originalLanguage: string;
  originalTitle: string;
  popularity: number;
  poster: string;
  releaseDate: Date;
  summary: string;
  score: number;
  title: string;
  video: boolean;
  votes: number;
}

export interface MovieDetailed extends Movie {
  imdbId?: string;
  belongsToCollection?: boolean;
  budget: number;
  homepage: string;
  genres: Genre[];
  productionCompanies: Company[];
  productionCountries: Country[];
  revenue: string;
  runtime: number;
  spokenLanguages: Language[];
  status: string;
  tagline: string;
}
