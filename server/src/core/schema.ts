import { gql } from 'apollo-server';
import { CompanyType } from '../company/company';
import { CountryType } from '../country/country';
import { GenreType } from '../genre/genre';
import { LanguageType } from '../language/language';
import { MovieType } from '../movie/movie.type';
import { MoviesAPI } from '../movie/movies.api';
import { DataSources } from './data-sources';
import { Resolvers } from './resolver';

export const typeDefs = gql`
  type Query {
    movie(id: Int!, region: String): MovieDetailed
    movies(title: String!, page: Int, region: String): [Movie]
    nowPlaying(page: Int, region: String): [Movie]
  }

  ${CompanyType}
  ${CountryType}
  ${GenreType}
  ${LanguageType}
  ${MovieType}
`;

export const resolvers: Resolvers = {
  Query: {
    movie: async (_, args, { dataSources: ds }) => ds.moviesAPI.one(args),
    movies: async (_, args, { dataSources: ds }) => ds.moviesAPI.search(args),
    nowPlaying: async (_, args, { dataSources: ds }) =>
      ds.moviesAPI.nowPlaying(args),
  },
};

export const dataSources = (): DataSources => ({
  moviesAPI: new MoviesAPI(),
});
