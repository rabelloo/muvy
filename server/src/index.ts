import { ApolloServer } from 'apollo-server';
import { serverConfig } from './core/server';

new ApolloServer(serverConfig).listen().then(({ url }) => {
  // tslint:disable-next-line: no-console
  console.log(`🚀 Server ready at ${url}`);
});
