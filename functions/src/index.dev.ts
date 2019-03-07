import { ApolloServer } from 'apollo-server';
import { config } from 'dotenv';
import { serverConfig } from './core/server';
import { environment } from './environment';

config();
environment.apiKey = process.env.apiKey!;

new ApolloServer(serverConfig).listen().then(({ url }) => {
  // tslint:disable-next-line: no-console
  console.log(`🚀 Server ready at ${url}`);
});
