import { gql } from 'apollo-server';

const movieBase = `
  id: Int
  title: String
  adult: Boolean
  backdrop: String
  originalLanguage: String
  originalTitle: String
  popularity: Float
  poster: String
  """
  Movie popularity determined by many factors.
  See https://developers.themoviedb.org/3/getting-started/popularity
  """
  releaseDate: String
  "Average score determined by user vote"
  score: Float
  summary: String
  "Amount of user votes"
  video: Boolean
  votes: Int
`;

export const MovieType = gql`
  type Movie {
    ${movieBase}
    genres: [Int]
  }

  type MovieDetailed {
    ${movieBase}
    imdbId: String
    belongsToCollection: Boolean
    "Amount of money spent to film"
    budget: Int
    homepage: String
    genres: [Genre]
    productionCompanies: [Company]
    productionCountries: [Country]
    "Amount of money earned globally in dollars"
    revenue: Int
    "Movie length/duration in minutes"
    runtime: Int
    spokenLanguages: [Language]
    status: String
    tagline: String
  }
`;
