import { DataSources as ApolloDataSources } from 'apollo-server-core/dist/graphqlOptions';
import { MoviesAPI } from '../movie/movies.api';

export interface DataSources extends ApolloDataSources<any> {
  moviesAPI: MoviesAPI;
}
