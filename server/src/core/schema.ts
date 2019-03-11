import { gql } from 'apollo-server';
import { MovieType } from '../movie/movie';
import { MoviesAPI } from '../movie/movies.api';
import { DataSources } from './data-sources';
import { Resolvers } from './resolver';

export const typeDefs = gql`
  type Query {
    nowPlaying(page: Int, region: String): [Movie]
  }

  ${MovieType}
`;

export const resolvers: Resolvers = {
  Query: {
    nowPlaying: async (_, args, { dataSources: ds }) =>
      ds.moviesAPI.getNowPlaying(args),
  },
};

export const dataSources = (): DataSources => ({
  moviesAPI: new MoviesAPI(),
});
