import { gql } from 'apollo-server';

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

export const MovieType = gql`
  type Movie {
    id: Int
    title: String
    summary: String
    "Average score determined by user vote"
    score: Float
    "Amount of user votes"
    votes: Int
    """
    Movie popularity determined by many factors.
    See https://developers.themoviedb.org/3/getting-started/popularity
    """
    popularity: Float
    releaseDate: String
    poster: String
    backdrop: String
    originalLanguage: String
    originalTitle: String
    video: Boolean
    genres: [Int]
    adult: Boolean
  }
`;
