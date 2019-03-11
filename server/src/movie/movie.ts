import { gql } from 'apollo-server';

export { Movie } from '~interfaces/movie';

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
