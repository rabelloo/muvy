import { gql } from 'apollo-server';

const movieBase = `
  id: Int
  title: String
  adult: Boolean
  backdrop: String
  originalLanguage: String
  originalTitle: String
  """
  Movie popularity determined by many factors.
  See https://developers.themoviedb.org/3/getting-started/popularity
  """
  popularity: Float
  poster: String
  releaseDate: String
  "Average score determined by user vote"
  score: Float
  summary: String
  video: Boolean
  "Amount of user votes"
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
    revenue: String
    "Movie length/duration in minutes"
    runtime: Int
    spokenLanguages: [Language]
    status: String
    tagline: String
  }
`;
