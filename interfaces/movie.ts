export interface Movie {
  id: number;
  title: string;
  summary: string;
  score: number;
  votes: number;
  popularity: number;
  releaseDate: Date;
  poster: string;
  backdrop: string;
  originalLanguage: string;
  originalTitle: string;
  video: boolean;
  genres: number[];
  adult: boolean;
}
