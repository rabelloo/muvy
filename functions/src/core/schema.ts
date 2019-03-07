import { gql, IResolvers } from 'apollo-server';
import { DataSources as ApolloDataSources } from 'apollo-server-core/dist/graphqlOptions';
import { MovieType } from '../movie/movie';
import { MoviesAPI } from '../movie/movies.api';

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

export interface DataSources extends ApolloDataSources<any> {
  moviesAPI: MoviesAPI;
}

export type Resolver = (
  source: any,
  args: any,
  config: { dataSources: DataSources }
) => any;

export interface Resolvers extends IResolvers {
  Query: { [key: string]: Resolver };
}
