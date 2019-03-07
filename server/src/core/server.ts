import { dataSources, resolvers, typeDefs } from './schema';

export const serverConfig = {
  typeDefs,
  resolvers,
  dataSources,
  playground: true,
  introspection: true,
  formatError: (error: any) =>
    // Remove api_key from any error responses
    JSON.parse(JSON.stringify(error).replace(/api_key=\w+/g, '')),
};
