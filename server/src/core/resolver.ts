import { IResolvers } from 'graphql-tools';
import { DataSources } from './data-sources';

export type Resolver = (
  source: any,
  args: any,
  config: { dataSources: DataSources }
) => any;

export interface Resolvers extends IResolvers {
  Query: { [key: string]: Resolver };
}
