import { dataSources, resolvers, typeDefs } from './schema';

export const serverConfig = {
  typeDefs,
  resolvers,
  dataSources,
  playground: true,
  introspection: true,
};
